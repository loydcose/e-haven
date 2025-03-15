"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlus, X } from "lucide-react"
import React, { useState } from "react"

export default function GuestInformation() {
  const [guests, setGuests] = useState([{ id: Date.now() + Math.random() }])

  const addGuest = () => {
    setGuests([...guests, { id: Date.now() + Math.random() }])
  }

  const removeGuest = (id: number) => {
    setGuests(guests.filter((guest) => guest.id !== id))
  }

  return (
    <>
      <div>
        <h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-center">
          Guest Information
        </h2>

        {guests.map((guest) => (
          <div
            key={guest.id}
            className="bg-amber-950 p-6 md:p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 relative"
          >
            {guests.length > 1 && (
              <Button
                type="button"
                variant={"ghost"}
                size={"icon"}
                className="absolute top-2 right-2 rounded-full"
                title="Remove guest"
                onClick={() => removeGuest(guest.id)}
              >
                <X />
              </Button>
            )}
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
              />
            </div>
            <div>
              <label htmlFor={`birthday-${guest.id}`} className="mb-1">
                Birthday
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id={`birthday-${guest.id}`}
                placeholder="Enter birthday..."
                className="bg-white text-black"
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="flex items-center gap-2 w-fit mx-auto bg-amber-400 hover:bg-amber-500 text-black"
        size={"lg"}
        onClick={addGuest}
      >
        Add more <CirclePlus className="text-white/75" />
      </Button>
    </>
  )
}
