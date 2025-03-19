"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match.",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Failed to reset password.",
        })
        setLoading(false)
        return
      }

      toast({
        variant: "default",
        title: "Success",
        description: "Your password has been reset successfully.",
      })

      // Optionally redirect the user to the login page
      // window.location.href = "/login"
    } catch (error) {
      console.error("Error resetting password:", error)
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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset your password
        </h2>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="password">New password</label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your new password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="confirmPassword">Confirm password</label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
    </div>
  )
}
