import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { ReservationTable } from "../../admin"
import { userReservationStatusStore } from "@/stores/reservation-status"
type SelectedStatus = "pending" | "paid" | "accepted"

export default function StatusSelection({
  reservation,
}: {
  reservation: ReservationTable
}) {
  const { setStatus } = userReservationStatusStore()
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>(
    reservation.status
  )
  useEffect(() => {
    setStatus(selectedStatus)
  }, [selectedStatus, reservation.paymentMethod])

  const handleStatusChange = (status: SelectedStatus) => {
    setSelectedStatus(status)
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
    </>
  )
}
