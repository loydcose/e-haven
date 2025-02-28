"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addUser } from "../actions"
import { useToast } from "@/hooks/use-toast"

export default function SignUp() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await addUser(formData)
    if (!res) {
      console.log(res)
      toast({
        title: "Sign up successful",
        description: "Redirecting to home page...",
        variant: "success",
      })
      return
    }

    toast({
      variant: "destructive",
      title: "Error",
      description: res.message,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstName">First name</label>
          <Input
            type="text"
            id="firstName"
            placeholder="Enter your first name..."
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lastName">Last name</label>
          <Input
            type="text"
            id="lastName"
            placeholder="Enter your last name..."
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

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

      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password..."
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-8">
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your password..."
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        size={"lg"}
        className="mb-8 w-full font-bold text-lg h-12"
      >
        Sign up
      </Button>
    </form>
  )
}
