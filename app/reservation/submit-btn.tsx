"use client"

import { Button } from "@/components/ui/button"
import { useReservationStore } from "@/stores/reservation"
import type { Accommodation } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Confirmation } from "./modals/confirmation"
import { DPNotice } from "./modals/dp-notice"
import { Payment } from "./modals/payment"
import { ReservationDone } from "./modals/reservation-done"

export type Modal = "confirmation" | "dpNotice" | "payment" | "reservationDone"

export default function SubmitButton({
  accommodation,
  userId,
}: {
  accommodation: Accommodation
  userId: string
}) {
  const store = useReservationStore()
  const { toast } = useToast()
  const [showModal, setShowModal] = useState<Modal | null>(null)

  // Move store filtering outside of handleClick
  const filteredStore = Object.fromEntries(
    Object.entries(store).filter(([, value]) => typeof value !== "function")
  )

  // Remove hasCheckAgreement from filtered store
  delete filteredStore.hasCheckAgreement

  // Add accommodation and user data
  filteredStore.accommodationId = accommodation.id
  filteredStore.userId = userId

  const handleClick = async () => {
    if (!store.hasCheckAgreement) {
      toast({
        title: "Error",
        description: "Please check the agreement",
        variant: "destructive",
      })
      return
    }

    setShowModal("confirmation" as Modal)
  }

  return (
    <>
      {showModal === "confirmation" && (
        <Confirmation setShowModal={setShowModal} />
      )}
      {showModal === "dpNotice" && <DPNotice setShowModal={setShowModal} />}
      {showModal === "payment" && <Payment setShowModal={setShowModal} />}

      {showModal === "reservationDone" && (
        <ReservationDone setShowModal={setShowModal} />
      )}

      {/* <Confirmation
        confirmationOpen={confirmationOpen}
        reservationData={filteredStore}
        accommodationPrice={accommodation.price}
      /> */}
      <Button
        type="button"
        size={"lg"}
        className="text-white bg-green-600 hover:bg-green-700"
        onClick={handleClick}
      >
        Continue
      </Button>
    </>
  )
}
