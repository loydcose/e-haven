"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SignIn() {
  const [showPass, setShowPass] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      if (!data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
        })
        return
      }

      toast({
        title: "Login successful",
        description: "Redirecting to admin page...",
        variant: "success",
      })

      // add 2 seconds delay before redirecting to home page
      setTimeout(() => {
        window.location.href = "/admin"
      }, 2000)
    } else {
      toast({
        variant: "destructive",
        title: "Server error",
        description: "Try again later",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          placeholder="Enter your username..."
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="password">Password</label>
        <div className="flex items-center gap-2 border border-white rounded-md pr-3">
          <Input
            type={showPass ? "text" : "password"}
            id="password"
            placeholder="Enter your password..."
            value={formData.password}
            onChange={handleChange}
            className="border-0 focus-visible:ring-0"
            required
          />
          <button
            type="button"
            className="hover:opacity-75"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        size={"lg"}
        className="mb-8 w-full font-bold text-lg h-12"
      >
        Login
      </Button>
    </form>
  )
}
