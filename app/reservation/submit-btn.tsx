"use client"

import { Button } from "@/components/ui/button"
import { useReservationStore } from "@/stores/reservation"

export default function SubmitButton() {
  const store = useReservationStore()

  const handleClick = () => {
    // Filter out the setter functions
    const filteredStore = Object.fromEntries(
      Object.entries(store).filter(
        ([key, value]) => typeof value !== "function"
      )
    )
    console.log(filteredStore)
  }

  return (
    <Button
      type="button"
      size={"lg"}
      className="text-white bg-green-600 hover:bg-green-700"
      onClick={handleClick}
    >
      Continue
    </Button>
  )
}
