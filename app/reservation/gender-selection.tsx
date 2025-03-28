import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Gender = "male" | "female" | null

export function GenderSelection({
  selectedGender,
  setSelectedGender,
}: {
  selectedGender: Gender
  setSelectedGender: (gender: Gender) => void
}) {
  return (
    <div>
      <p>
        Gender<span className="text-red-600">*</span>
      </p>
      <Select
        value={selectedGender || undefined} // Bind the current gender value
        onValueChange={(value) => setSelectedGender(value as Gender)} // Update the gender in the store
      >
        <SelectTrigger className="text-black bg-white">
          <SelectValue
            placeholder="Select gender"
            className="text-black bg-white"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select your gender</SelectLabel>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
