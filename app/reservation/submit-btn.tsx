"use client"

import { Button } from "@/components/ui/button"
import { useReservationStore } from "@/stores/reservation"
import { addReservation } from "@/app/actions"
import type { Accommodation } from "@prisma/client"

// TODO: TOBE CONTINUED - adding reservation to database

export default function SubmitButton({
  accommodation,
  userId,
}: {
  accommodation: Accommodation
  userId: string
}) {
  const store = useReservationStore()
  console.log({ accommodation, userId })

  const handleClick = async () => {
    const filteredStore = Object.fromEntries(
      Object.entries(store).filter(([, value]) => typeof value !== "function")
    )

    filteredStore.accommodationId = accommodation.id
    filteredStore.userId = userId
    // @ts-expect-error filtered store has no type
    filteredStore.totalPrice = filteredStore.totalPrice + accommodation.price
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
