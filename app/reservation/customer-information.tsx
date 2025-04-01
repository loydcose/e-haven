"use client"

import { Input } from "@/components/ui/input"
import { useReservationStore } from "@/stores/reservation"
import { GenderSelection } from "./gender-selection"
import { HealthSelection } from "./health-selection"
import type { User } from "@prisma/client"

export default function CustomerInformation({ user }: { user: User }) {
  const {
    setAddress,
    setBirthday,
    setContactNumber,
    gender,
    setGender,
    healthIssue,
    setHealthIssue,
  } = useReservationStore()

  const inputFields = [
    {
      id: "firstName",
      label: "First name",
      type: "text",
      defaultValue: user.firstName, // Use real data from user
      required: true,
    },
    {
      id: "lastName",
      label: "Last name",
      type: "text",
      defaultValue: user.lastName, // Use real data from user
      required: true,
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      required: true,
      colSpan: true,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      defaultValue: user.email, // Use real data from user
      colSpan: true,
      required: true,
    },
    { id: "birthday", label: "Birthday", type: "date", required: true },
    { id: "contactNumber", label: "Contact number", type: "tel", required: true },
  ]

  const handleInputChange = (id: string, value: string) => {
    if (id === "address") {
      setAddress(value)
    } else if (id === "birthday") {
      setBirthday(new Date(value))
    } else if (id === "contactNumber") {
      setContactNumber(value)
    }
  }

  return (
    <div>
      <h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-center">
        Customer Information
      </h2>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {inputFields.map((field) => (
          <div key={field.id} className={field.colSpan ? "md:col-span-2" : ""}>
            <label htmlFor={field.id} className="mb-1">
              {field.label}
              {field.required && <span className="text-red-600">*</span>}
            </label>
            <Input
              type={field.type}
              id={field.id}
              placeholder={`Enter your ${field.label.toLowerCase()}...`}
              defaultValue={field.defaultValue || ""} // Use defaultValue from user or fallback
              disabled={!!field.defaultValue} // Disable if defaultValue exists
              className="bg-white text-black"
              required={field.required}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          </div>
        ))}
        <GenderSelection
          setSelectedGender={setGender}
          selectedGender={gender}
        />
        <HealthSelection
          selectedHealthIssue={healthIssue}
          setSelectedHealthIssue={setHealthIssue}
        />
      </div>
    </div>
  )
}