import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import { ReservationTable } from "../../admin"
import * as XLSX from "xlsx"

export default function GenerateReport({
  reservations,
}: {
  reservations: ReservationTable[]
}) {
  const handleGenerateReport = () => {
    if (!reservations || reservations.length === 0) {
      console.error("No reservations to generate a report.")
      return
    }

    // Prepare data for the Excel file
    const data = reservations.map((reservation) => ({
      ID: reservation.id,
      "Booked By": `${reservation.user.firstName} ${reservation.user.lastName}`,
      "Check In": new Date(reservation.checkIn).toLocaleDateString(),
      "Check Out": new Date(reservation.checkOut).toLocaleDateString(),
      Birthday: new Date(reservation.birthday).toLocaleDateString(),
      Gender: reservation.gender,
      "Health Issue": reservation.healthIssue,
      Address: reservation.address,
      "Contact Number": reservation.contactNumber,
      Guests: Array.isArray(reservation.guests)
        ? reservation.guests
            .map((guest) =>
              guest && typeof guest === "object" && "name" in guest
                ? guest.name
                : ""
            )
            .join(", ")
        : "No Guests",
      "Total Price": `${reservation.totalPrice} Php`,
      "Created At": new Date(reservation.createdAt).toLocaleDateString(),
      Status: reservation.status,
    }))

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations")

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, "Reservations_Report.xlsx")
  }

  return (
    <Button
      type="button"
      className="ml-auto mt-4 bg-green-600 hover:bg-green-700 flex gap-2 items-center"
      onClick={handleGenerateReport}
    >
      <div className="w-[18px] h-[18px]">
        <Image
          src="/icons/excel.png"
          alt="Excel logo"
          width={44}
          height={40}
          className="size-full object-cover"
        />
      </div>
      Generate Report
    </Button>
  )
}
