"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

export default function ProofPaymentUpload({
  proofPayment,
  handleFieldChange,
}: {
  proofPayment: string | null
  handleFieldChange: (
    field: string,
    value: string | number | string[] | null
  ) => void
}) {
  const [proofPaymentPreview, setProofPaymentPreview] = useState<string | null>(proofPayment)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (proofPayment) {
      setProofPaymentPreview(proofPayment)
    } else {
      setProofPaymentPreview(null)
    }
  }, [proofPayment])

  useEffect(() => {
    handleFieldChange("proofPayment", proofPaymentPreview)
  }, [proofPaymentPreview])

  const handleProofPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf"
      ]
      if (!validImageTypes.includes(file.type)) {
        toast({
          title: "Error",
          description:
            "Invalid file type. Please upload a valid image (JPEG, PNG, GIF, WEBP) or PDF.",
          variant: "destructive",
        })
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setProofPaymentPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProofPayment = () => {
    setProofPaymentPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <div className="mb-4">
        {/* Display the uploaded proof of payment or nothing if not uploaded */}
        {proofPaymentPreview ? (
          <div className="flex items-start gap-2">
            <div className="w-full rounded-md shadow-md overflow-hidden">
              {proofPaymentPreview.startsWith('data:image') ? (
                <Image
                  src={proofPaymentPreview}
                  alt="Proof of Payment Preview"
                  className="size-full object-cover"
                  width={300}
                  height={300}
                />
              ) : (
                <div className="bg-gray-100 p-4 text-center">
                  <p>PDF Document</p>
                </div>
              )}
            </div>
            <Button
              type="button"
              size={"icon"}
              className="rounded-full shrink-0"
              variant={"ghost"}
              onClick={handleRemoveProofPayment}
              title="Remove proof of payment"
            >
              <X />
            </Button>
          </div>
        ) : null}
      </div>

      <Label htmlFor="proof-payment-upload">Proof of Payment (Optional)</Label>
      <Input
        id="proof-payment-upload"
        type="file"
        accept="image/*,.pdf"
        onChange={handleProofPaymentChange}
        ref={fileInputRef}
      />
    </div>
  )
} 