"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlus, X } from "lucide-react"
import { useReservationStore } from "@/stores/reservation"
import { GenderSelection } from "./gender-selection"
import { HealthSelection } from "./health-selection"

export default function GuestInformation() {
  const {
    guests,
    addGuest,
    removeGuest,
    updateGuest,
    setTotalPrice,
    totalPrice,
  } = useReservationStore()

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const handleAddGuest = () => {
    addGuest({
      id: generateId(),
      name: "",
      birthday: null,
      gender: null,
      healthIssue: null,
    })
    setTotalPrice(totalPrice + 100) // Increment total price by 100
  }

  const handleRemoveGuest = (index: number) => {
    removeGuest(index)
    setTotalPrice(totalPrice - 100) // Decrement total price by 100
  }

  const handleGuestChange = (
    index: number,
    field: "name" | "birthday" | "gender" | "healthIssue",
    value: string | Date | null
  ) => {
    const updatedGuest = {
      ...guests[index],
      [field]: field === "birthday" ? new Date(value as string) : value,
    }
    updateGuest(index, updatedGuest)
  }

  return (
    <>
      <div>
        <h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-center">
          Guest Information
        </h2>

        {guests.map((guest, index) => (
          <div
            key={guest.id} // Use the unique `id` property for rendering
            className="bg-amber-950 p-6 md:p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 relative"
          >
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              className="absolute top-2 right-2 rounded-full"
              title="Remove guest"
              onClick={() => handleRemoveGuest(index)}
            >
              <X />
            </Button>
            <div>
              <label htmlFor={`name-${guest.id}`} className="mb-1">
                Name
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id={`name-${guest.id}`}
                placeholder="Enter your name..."
                className="bg-white text-black"
                value={guest.name}
                onChange={(e) =>
                  handleGuestChange(index, "name", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor={`birthday-${guest.id}`} className="mb-1">
                Birthday
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="date"
                id={`birthday-${guest.id}`}
                placeholder="Enter birthday..."
                className="bg-white text-black"
                value={
                  guest.birthday
                    ? new Date(guest.birthday).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleGuestChange(index, "birthday", e.target.value)
                }
              />
            </div>
            <div>
              <GenderSelection
                selectedGender={guest.gender}
                setSelectedGender={(gender) =>
                  handleGuestChange(index, "gender", gender)
                }
              />
            </div>
            <div>
              <HealthSelection
                selectedHealthIssue={guest.healthIssue}
                setSelectedHealthIssue={(healthIssue) =>
                  handleGuestChange(index, "healthIssue", healthIssue)
                }
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="flex items-center gap-2 w-fit mx-auto bg-amber-400 hover:bg-amber-500 text-black"
        size={"lg"}
        onClick={handleAddGuest}
      >
        Add more <CirclePlus className="text-white/75" />
      </Button>
    </>
  )
}
