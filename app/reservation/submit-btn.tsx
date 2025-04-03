"use client"

import { Button } from "@/components/ui/button"
import { useReservationStore } from "@/stores/reservation"
import { addReservation } from "@/app/actions"
import type { Accommodation } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
import { DownPaymentNotice } from "./downpayment-notice"
import { Confirmation } from "./confirmation"
import { useState } from "react"

// TODO: TOBE CONTINUED - adding reservation to database

export default function SubmitButton({
  accommodation,
  userId,
}: {
  accommodation: Accommodation
  userId: string
}) {
  const store = useReservationStore()
  const { toast } = useToast()
  const [dpNoticeOpen, setDpNoticeOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  // Move store filtering outside of handleClick
  const filteredStore = Object.fromEntries(
    Object.entries(store).filter(([, value]) => typeof value !== "function")
  )

  // Remove hasCheckAgreement from filtered store
  delete filteredStore.hasCheckAgreement

  // Add accommodation and user data
  filteredStore.accommodationId = accommodation.id
  filteredStore.userId = userId
  // @ts-expect-error filtered store has no type
  filteredStore.totalPrice = filteredStore.totalPrice + accommodation.price

  const handleClick = async () => {
    if (!store.hasCheckAgreement) {
      toast({
        title: "Error",
        description: "Please check the agreement",
        variant: "destructive",
      })
      return
    }

    setDpNoticeOpen(true)
  }

  return (
    <>
      <DownPaymentNotice
        dpNoticeOpen={dpNoticeOpen}
        setDpNoticeOpen={setDpNoticeOpen}
        setConfirmationOpen={setConfirmationOpen}
      />
      <Confirmation
        confirmationOpen={confirmationOpen}
        setConfirmationOpen={setConfirmationOpen}
        reservationData={filteredStore}
        accommodation={accommodation}
        userId={userId}
      />
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
