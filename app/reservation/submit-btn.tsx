"use client"

import { Button } from "@/components/ui/button"
import { useReservationStore } from "@/stores/reservation"
import { addReservation } from "@/app/actions"

export default function SubmitButton() {
  const store = useReservationStore()

  const handleClick = async () => {
    const filteredStore = Object.fromEntries(
      Object.entries(store).filter(([, value]) => typeof value !== "function")
    )

    console.log(filteredStore)
    // @ts-expect-error `addReservation` expects a filtered store
    const response = await addReservation(filteredStore)
    console.log(response.message)
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
