"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

export default function ImageUpload({
  image,
  handleFieldChange,
}: {
  image: string | null
  handleFieldChange: (
    field: string,
    value: string | number | string[] | null
  ) => void
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(image)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (image) {
      setImagePreview(image)
    } else {
      setImagePreview(null)
    }
  }, [image])

  useEffect(() => {
    handleFieldChange("image", imagePreview)
  }, [imagePreview])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ]
      if (!validImageTypes.includes(file.type)) {
        toast({
          title: "Error",
          description:
            "Invalid file type. Please upload a valid image (JPEG, PNG, GIF, or WEBP).",
          variant: "destructive",
        })
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <div className="mb-4">
        {/* Display the uploaded image or the default accommodation image */}
        {imagePreview ? (
          <div className="flex items-start gap-2">
            <div className="w-full rounded-md shadow-md overflow-hidden">
              <Image
                src={imagePreview}
                alt="Uploaded Preview"
                className="size-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <Button
              type="button"
              size={"icon"}
              className="rounded-full shrink-0"
              variant={"ghost"}
              onClick={handleRemoveImage} // Remove the image on click
              title="Remove image"
            >
              <X />
            </Button>
          </div>
        ) : null}
      </div>

      <Label htmlFor="image-upload">Image</Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef} // Attach the ref to the input
      />
    </div>
  )
}
