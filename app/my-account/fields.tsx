"use client"

import React, { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check } from "lucide-react"
import { EditPassword } from "./edit-password"
import { User } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { updateUser } from "../actions"
import Spinner from "@/components/icons/spinner"
import { CheckEmailModal } from "./check-email-modal"
import { VerifyEmailButton } from "./verify-email-button"
import { DeleteAccount } from "./delete-account"

export default function Fields({ user }: { user: User }) {
  const [checkEmailModalOpen, setCheckEmailModalOpen] = useState(false)
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
  })
  const [originalData] = useState({ ...data }) // Store the original data
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  }

  const handleEditClick = (field: string) => {
    // TODO: remove this line
    // @ts-expect-error field is not exist in type never
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }))
    if (!editMode[field as keyof typeof editMode]) {
      setTimeout(() => {
        inputRefs[field as keyof typeof inputRefs].current?.focus()
        inputRefs[field as keyof typeof inputRefs].current?.select()
      }, 0)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setData((prevData) => ({ ...prevData, [id]: value }))
  }

  const handleUpdate = async (field: string) => {
    // Prevent request if no changes were made
    if (
      data[field as keyof typeof data] ===
      originalData[field as keyof typeof originalData]
    ) {
      setEditMode((prev) => ({ ...prev, [field]: false }))
      return
    }

    setLoading(true)
    try {
      const updatedData = { [field]: data[field as keyof typeof data] }
      const response = await updateUser(user.id, updatedData)

      if (response.success) {
        toast({
          variant: "success",
          title: "Success",
          description: response.message,
        })
        setEditMode((prev) => ({ ...prev, [field]: false }))
      } else {
        // Revert to original value on error
        setData((prevData) => ({
          ...prevData,
          [field]: originalData[field as keyof typeof originalData],
        }))
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        })
        setEditMode((prev) => ({ ...prev, [field]: false }))
      }
    } catch (error) {
      console.error("Error updating user:", error)
      // Revert to original value on error
      setData((prevData) => ({
        ...prevData,
        [field]: originalData[field as keyof typeof originalData],
      }))
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
        email={user.email}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="firstName" className="mb-1">
            First Name
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="firstName"
              value={data.firstName}
              onChange={handleChange}
              disabled={!editMode.firstName || loading}
              className="bg-white text-black"
              required
              ref={inputRefs.firstName}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() =>
                editMode.firstName
                  ? handleUpdate("firstName")
                  : handleEditClick("firstName")
              }
              disabled={loading}
            >
              {loading && editMode.firstName ? (
                <Spinner />
              ) : editMode.firstName ? (
                <Check strokeWidth={2.5} />
              ) : (
                <Pencil strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>

        {/* Last Name Field */}
        <div>
          <label htmlFor="lastName" className="mb-1">
            Last Name
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="lastName"
              value={data.lastName}
              onChange={handleChange}
              disabled={!editMode.lastName || loading}
              className="bg-white text-black"
              required
              ref={inputRefs.lastName}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() =>
                editMode.lastName
                  ? handleUpdate("lastName")
                  : handleEditClick("lastName")
              }
              disabled={loading}
            >
              {loading && editMode.lastName ? (
                <Spinner />
              ) : editMode.lastName ? (
                <Check strokeWidth={2.5} />
              ) : (
                <Pencil strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="mb-1">
            Username
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              id="username"
              value={data.username}
              onChange={handleChange}
              disabled={!editMode.username || loading}
              className="bg-white text-black"
              required
              ref={inputRefs.username}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() =>
                editMode.username
                  ? handleUpdate("username")
                  : handleEditClick("username")
              }
              disabled={loading}
            >
              {loading && editMode.username ? (
                <Spinner />
              ) : editMode.username ? (
                <Check strokeWidth={2.5} />
              ) : (
                <Pencil strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-1">
            Email
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Input
              type="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              disabled={!editMode.email || loading}
              className="bg-white text-black"
              required
              ref={inputRefs.email}
            />
            <VerifyEmailButton
              email={user.email}
              isVerified={user.isEmailVerified}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() =>
                editMode.email
                  ? handleUpdate("email")
                  : handleEditClick("email")
              }
              disabled={loading}
            >
              {loading && editMode.email ? (
                <Spinner />
              ) : editMode.email ? (
                <Check strokeWidth={2.5} />
              ) : (
                <Pencil strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="mb-1">
            Password
            <span className="text-red-600">*</span>
          </label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password..."
            className="bg-white text-black"
            required
            defaultValue="********" // Masked password
            disabled
          />
        </div>
        <EditPassword userId={user.id} />
      </div>
      <div className="mt-4 md:mt-8">
        <DeleteAccount userId={user.id}/>
      </div>
    </>
  )
}
