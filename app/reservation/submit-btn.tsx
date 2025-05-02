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
  const [totalAmount, setTotalAmount] = useState<number>(0)

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

    // Check if the user is below 18 years old
    const today = new Date()
    const birthDate = new Date(store.birthday as Date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }

    if (age < 18) {
      toast({
        title: "Error",
        description: "You must be at least 18 years old to proceed",
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
      {showModal === "dpNotice" && (
        <DPNotice
          setShowModal={setShowModal}
          accommodationPrice={accommodation.price}
          setTotalAmount={setTotalAmount}
        />
      )}
      {showModal === "payment" && (
        <Payment
          setShowModal={setShowModal}
          totalAmount={totalAmount}
          reservationData={filteredStore}
        />
      )}

      {showModal === "reservationDone" && (
        <ReservationDone setShowModal={setShowModal} />
      )}

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
