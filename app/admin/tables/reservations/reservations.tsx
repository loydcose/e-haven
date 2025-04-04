import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useAdminFilterStore } from "@/stores/admin-filter"
import type { JsonArray, JsonObject } from "@prisma/client/runtime/library"
import { useEffect, useState } from "react"
import { ReservationAction } from "./reservations-action"
import { ReservationTable } from "../../admin"

// Reservations Table Component
export default function ReservationsTable({
  reservations,
}: {
  reservations: ReservationTable[]
}) {
  const [filteredReservations, setFilteredReservations] =
    useState<ReservationTable[]>(reservations)
  const { search, sort, activeSection } = useAdminFilterStore()

  useEffect(() => {
    if (activeSection !== "reservations") return

    let updatedReservations = [...reservations]

    // Filter by search
    if (search) {
      updatedReservations = updatedReservations.filter(
        (reservation) =>
          `${reservation.user.firstName} ${reservation.user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    }

    // Sort by Booked by (user's full name)
    if (sort === "asc") {
      updatedReservations.sort((a, b) => 
        `${a.user.firstName} ${a.user.lastName}`.localeCompare(
          `${b.user.firstName} ${b.user.lastName}`
        )
      )
    } else if (sort === "desc") {
      updatedReservations.sort((a, b) => 
        `${b.user.firstName} ${b.user.lastName}`.localeCompare(
          `${a.user.firstName} ${a.user.lastName}`
        )
      )
    }

    setFilteredReservations(updatedReservations)
  }, [activeSection, search, sort, reservations])

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Booked by</TableHead>
          <TableHead className="text-black">Check In</TableHead>
          <TableHead className="text-black">Check Out</TableHead>

          <TableHead className="text-black">Birthday</TableHead>
          <TableHead className="text-black">Gender</TableHead>
          <TableHead className="text-black">Health issue</TableHead>

          <TableHead className="text-black">Address</TableHead>
          <TableHead className="text-black">Contact Number</TableHead>
          <TableHead className="text-black">Guests</TableHead>
          <TableHead className="text-black">Total Price</TableHead>
          <TableHead className="text-black">Created At</TableHead>
          <TableHead className="text-black">Status</TableHead>
          <TableHead className="text-black">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredReservations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={14} className="text-center">
              No reservations found
            </TableCell>
          </TableRow>
        ) : (
          filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>
                {reservation.user.firstName} {reservation.user.lastName}
              </TableCell>
              <TableCell>
                {new Date(reservation.checkIn).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(reservation.checkOut).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {new Date(reservation.birthday).toLocaleDateString()}
              </TableCell>
              <TableCell>{reservation.gender}</TableCell>
              <TableCell>{reservation.healthIssue}</TableCell>

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
              <TableCell>
                {new Date(reservation.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <p
                  className={cn(
                    "rounded-full py-1 px-3 font-medium",
                    reservation.status === "pending" &&
                      "bg-orange-600 text-white",
                    reservation.status === "paid" && "bg-gray-400 text-white",
                    reservation.status === "accepted" && "bg-green-600 text-white"
                  )}
                >
                  {reservation.status}
                </p>
              </TableCell>
              <TableCell>
                <ReservationAction reservation={reservation} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
