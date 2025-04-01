"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addUser } from "../actions"
import { useToast } from "@/hooks/use-toast"
import Agreement from "./agreement"
import Spinner from "@/components/icons/spinner"

export default function SignUp() {
  const { toast } = useToast()
  const [hasCheckAgreement, setHasCheckAgreement] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
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

    if (!hasCheckAgreement) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please check the agreement",
      })
      return
    }

    setLoading(true) // Start loading

    try {
      const res = await addUser(formData)

      if (!res.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.message,
        })
        setLoading(false) // Stop loading
        return
      }

      const response = await fetch("/api/login", {
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
          setLoading(false) // Stop loading
          return
        }

        toast({
          title: "Sign up successful",
          description: "Redirecting to home page...",
          variant: "success",
        })

        // Add 2 seconds delay before redirecting to home page
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      } else {
        toast({
          variant: "destructive",
          title: "Server error",
          description: "Try again later",
        })
      }
    } catch (error) {
      console.error("Caught error + " + (error as { message: string }).message)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Server error, please try again later.",
      })
    } finally {
      setLoading(false) // Stop loading
    }
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
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email..."
          value={formData.email}
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
      <Agreement
        hasCheckAgreement={hasCheckAgreement}
        setHasCheckAgreement={setHasCheckAgreement}
      />
      <Button
        type="submit"
        size={"lg"}
        className="mb-8 w-full font-bold text-lg h-12"
        disabled={loading} // Disable button while loading
      >
        {loading ? <Spinner /> : "Sign up"}
      </Button>
    </form>
  )
}
