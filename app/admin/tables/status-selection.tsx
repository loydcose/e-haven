import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { ReservationTable } from "../admin"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { userReservationStatusStore } from "@/stores/reservation-status"
import ProofPaymentUpload from "./reservations/proof-payment-upload"

type SelectedStatus = "pending" | "paid" | "accepted"

export default function StatusSelection({
  reservation,
  onFieldChange,
}: {
  reservation: ReservationTable
  onFieldChange?: (field: string, value: string | number | string[] | null) => void
}) {
  const { setStatus, paymentMethod, setPaymentMethod } =
    userReservationStatusStore()
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>(
    reservation.status
  )
  const [proofPayment, setProofPayment] = useState<string | null>(
    reservation.proofPayment
  )

  useEffect(() => {
    setStatus(selectedStatus)
    setPaymentMethod(reservation.paymentMethod)
  }, [selectedStatus, reservation.paymentMethod])

  const handleStatusChange = (status: SelectedStatus) => {
    setSelectedStatus(status)
  }

  const handleFieldChange = (
    field: string,
    value: string | number | string[] | null
  ) => {
    if (field === "proofPayment") {
      setProofPayment(value as string | null)
      if (onFieldChange) {
        onFieldChange(field, value)
      }
    }
  }

  return (
    <>
      <div className="mb-4 grid grid-cols-3 items-center gap-2">
        <Button
          onClick={() => handleStatusChange("pending")}
          className={cn(
            "bg-yellow-600 hover:bg-yellow-700 text-white",
            selectedStatus === "pending" &&
              "ring-2 ring-yellow-600 ring-offset-2"
          )}
        >
          Pending
        </Button>
        <Button
          onClick={() => handleStatusChange("accepted")}
          className={cn(
            "bg-green-600 hover:bg-green-700 text-white",
            selectedStatus === "accepted" &&
              "ring-2 ring-green-600 ring-offset-2"
          )}
        >
          Accepted
        </Button>
        <Button
          onClick={() => handleStatusChange("paid")}
          className={cn(
            "bg-gray-500 hover:bg-gray-600 text-white",
            selectedStatus === "paid" && "ring-2 ring-gray-500 ring-offset-2"
          )}
        >
          Paid
        </Button>
      </div>
      {/* paid tru */}

      {selectedStatus !== "pending" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Input
              type="text"
              placeholder="ex. G-cash, Credit-card, Cash"
              value={paymentMethod || ""}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          
          <ProofPaymentUpload 
            proofPayment={proofPayment} 
            handleFieldChange={handleFieldChange} 
          />
        </div>
      )}
    </>
  )
}
