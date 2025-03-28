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

  const handleClick = async () => {
    const filteredStore = Object.fromEntries(
      Object.entries(store).filter(([, value]) => typeof value !== "function")
    )

    if (!filteredStore.hasCheckAgreement) {
      toast({
        title: "Error",
        description: "Please check the agreement",
        variant: "destructive",
      })
      return
    }

    // Remove the `hasCheckAgreement` property
    delete filteredStore.hasCheckAgreement

    filteredStore.accommodationId = accommodation.id
    filteredStore.userId = userId
    // @ts-expect-error filtered store has no type
    filteredStore.totalPrice = filteredStore.totalPrice + accommodation.price

    console.log({filteredStore})

    // @ts-expect-error `addReservation` expects a filtered store
    const response = await addReservation(filteredStore)
    if (response.success) {
      toast({
        title: "Reservation added successfully",
        variant: "success",
      })
      setDpNoticeOpen(true)
    } else {
      toast({
        title: "Failed to add reservation",
        description: response.message,
        variant: "destructive",
      })
    }
    console.log(response)
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
