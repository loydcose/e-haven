"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/icons/spinner"
import { useToast } from "@/hooks/use-toast"
import { CheckEmailModal } from "./check-email-modal"

export function VerifyEmailButton({
  email,
  isVerified,
}: {
  email: string
  isVerified: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [checkEmailModalOpen, setCheckEmailModalOpen] = useState(false)
  const { toast } = useToast()
  const [showVerifyBtn, setShowVerifyBtn] = useState(!isVerified)

  const handleVerifyEmail = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.success) {
          setShowVerifyBtn(false)
          setCheckEmailModalOpen(true)
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message || "Failed to send verification email.",
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to send verification email.",
        })
      }
    } catch (error) {
      console.error("Error verifying email:", error)
      toast({
        variant: "destructive",
        title: "Server Error",
        description: "Something went wrong. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CheckEmailModal
        checkEmailModalOpen={checkEmailModalOpen}
        setCheckEmailModalOpen={setCheckEmailModalOpen}
        email={email}
      />
      {showVerifyBtn && (
        <Button
          type="button"
          size={"sm"}
          variant={"default"}
          onClick={handleVerifyEmail}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Verify Email"}
        </Button>
      )}
    </>
  )
}
