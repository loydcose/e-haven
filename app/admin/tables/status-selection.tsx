import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { ReservationTable } from "../admin"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
type SelectedStatus = "pending" | "paid" | "accepted"

export default function StatusSelection({
  reservation,
}: {
  reservation: ReservationTable
}) {
  const [selectedStatus, setSelectedStatus] = useState<SelectedStatus>(
    reservation.status
  )

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
      {/* paid tru */}

      {selectedStatus !== "pending" && (
        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Input type="text" placeholder="ex. G-cash, Credit-card, Cash" />
        </div>
      )}
    </>
  )
}
