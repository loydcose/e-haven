"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [showEmailSent, setShowEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      const data = await response.json()

      if (!data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        })
        setLoading(false) // Stop loading on error
        return
      }
      toast({
        variant: "default",
        title: "Success",
        description: data.message,
      })

      // Show success message
      setShowEmailSent(true)
    } else {
      toast({
        variant: "destructive",
        title: "Server error",
        description: "Try again later",
      })
    }

    setLoading(false) // Stop loading after the request is complete
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {showEmailSent ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4 font-bold">Email Sent!</h2>
          <p>
            Please check your email at <b>{email}</b> for instructions to reset
            your password.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Enter your email
          </h2>
          <div className="flex flex-col gap-1 mb-4">
            <Input
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            size={"lg"}
            className="mb-8 w-full font-bold text-lg h-12 flex items-center justify-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="loader spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white"></span>
                Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
