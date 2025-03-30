import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminFilterStore } from "@/stores/admin-filter"
import type { Reservation } from "@prisma/client"
import type { JsonArray, JsonObject } from "@prisma/client/runtime/library"
import { useEffect, useState } from "react"

// Reservations Table Component
export default function ReservationsTable({
  reservations,
}: {
  reservations: Reservation[]
}) {
  const [filteredReservations, setFilteredReservations] =
    useState<Reservation[]>(reservations)
  const { search, sort, activeSection } = useAdminFilterStore()

  useEffect(() => {
    if (activeSection !== "reservations") return

    let updatedReservations = [...reservations]

    // Filter by search
    if (search) {
      updatedReservations = updatedReservations.filter(
        (reservation) =>
          reservation.address.toLowerCase().includes(search.toLowerCase()) ||
          reservation.contactNumber
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (reservation.guests &&
            (reservation.guests as JsonArray).some((guest) =>
              (((guest as JsonObject).name || "") as string)
                .toLowerCase()
                .includes(search.toLowerCase())
            ))
      )
    }

    // Sort by Check-In Date (or any other field)
    if (sort === "asc") {
      updatedReservations.sort(
        (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
      )
    } else if (sort === "desc") {
      updatedReservations.sort(
        (a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
      )
    }

    setFilteredReservations(updatedReservations)
  }, [activeSection, search, sort, reservations])

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Check In</TableHead>
          <TableHead className="text-black">Check Out</TableHead>
          <TableHead className="text-black">Address</TableHead>
          <TableHead className="text-black">Contact Number</TableHead>
          <TableHead className="text-black">Guests</TableHead>
          <TableHead className="text-black">Total Price</TableHead>
          <TableHead className="text-black">Status</TableHead>
          <TableHead className="text-black">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredReservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.id}</TableCell>
            <TableCell>
              {new Date(reservation.checkIn).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(reservation.checkOut).toLocaleDateString()}
            </TableCell>
            <TableCell>{reservation.address}</TableCell>
            <TableCell>{reservation.contactNumber}</TableCell>
            <TableCell>
              {reservation.guests &&
              (reservation.guests as JsonArray).length > 0
                ? (reservation.guests as JsonArray)
                    .map((guest) => (guest as JsonObject).name || "")
                    .join(", ")
                : "No Guests"}
            </TableCell>
            <TableCell>{reservation.totalPrice} Php</TableCell>
            <TableCell>{reservation.status}</TableCell>
            <TableCell>
              {new Date(reservation.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
