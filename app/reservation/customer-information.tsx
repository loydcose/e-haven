"use client"

import { Input } from "@/components/ui/input"
import { useReservationStore } from "@/stores/reservation"

const inputFields = [
  {
    id: "firstName",
    label: "First name",
    type: "text",
    defaultValue: "Loyd",
    required: true,
  },
  {
    id: "lastName",
    label: "Last name",
    type: "text",
    defaultValue: "Cose",
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
    defaultValue: "loydcose@gmail.com",
    colSpan: true,
    required: true,
  },
  { id: "birthday", label: "Birthday", type: "date", required: true },
  { id: "contactNumber", label: "Contact number", type: "tel", required: true },
]

export default function CustomerInformation() {
  const { setAddress, setBirthday, setContactNumber } = useReservationStore()

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
              defaultValue={field.defaultValue || ""}
              disabled={!!field.defaultValue}
              className="bg-white text-black"
              required={field.required}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
