"use client"

import React, { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check } from "lucide-react"
import { EditPassword } from "./edit-password"

const initialData = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "johndoe@yahoo.com",
  password: "password",
}

const inputFields = [
  { id: "firstName", label: "First Name", type: "text" },
  { id: "lastName", label: "Last Name", type: "text" },
  { id: "username", label: "Username", type: "text" },
  { id: "email", label: "Email", type: "email" },
]

export default function Fields() {
  const [data, setData] = useState(initialData)
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
  })

  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  }

  const handleEditClick = (field: string) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {inputFields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-1">
            {field.label}
            <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Input
              type={field.type}
              id={field.id}
              value={data[field.id as keyof typeof data]}
              onChange={handleChange}
              disabled={!editMode[field.id as keyof typeof editMode]}
              className="bg-white text-black"
              required
              ref={inputRefs[field.id as keyof typeof inputRefs]}
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() => handleEditClick(field.id)}
            >
              {editMode[field.id as keyof typeof editMode] ? (
                <Check strokeWidth={2.5} />
              ) : (
                <Pencil strokeWidth={2.5} />
              )}
            </Button>
          </div>
        </div>
      ))}
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
          defaultValue={data.password}
          disabled
        />
      </div>
      <EditPassword />
    </div>
  )
}
