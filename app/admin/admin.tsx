"use client"

import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsers, getAccommodations, getReservations } from "../actions"
import { Button } from "@/components/ui/button"
import { Accommodation, Reservation, User } from "@prisma/client"
import LoadingSkeleton from "./loading-skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { JsonArray, JsonObject } from "@prisma/client/runtime/library"

// Define a discriminated union type for the data state
type AdminData =
  | { type: "users"; data: User[] }
  | { type: "accommodations"; data: Accommodation[] }
  | { type: "reservations"; data: Reservation[] }

export function Admin() {
  const [activeSection, setActiveSection] = useState<
    "users" | "accommodations" | "reservations"
  >("users")
  const [data, setData] = useState<AdminData>({ type: "users", data: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (activeSection === "users") {
          const users = await getUsers()
          setData({ type: "users", data: users })
        } else if (activeSection === "accommodations") {
          const accommodations = await getAccommodations()
          setData({ type: "accommodations", data: accommodations })
        } else if (activeSection === "reservations") {
          const reservations = await getReservations()
          setData({ type: "reservations", data: reservations })
        }
      } catch (error) {
        console.error(`Error fetching ${activeSection}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeSection])

  return (
    <div>
      {/* Section Buttons */}
      <div className="flex items-center mb-4 md:mb-8">
        <Button
          type="button"
          variant={activeSection === "users" ? "default" : "ghost"}
          onClick={() => setActiveSection("users")}
          className="h-8 rounded-md px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2"
        >
          Users
        </Button>
        <Button
          type="button"
          variant={activeSection === "accommodations" ? "default" : "ghost"}
          onClick={() => setActiveSection("accommodations")}
          className="h-8 rounded-md px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2"
        >
          Accommodations
        </Button>
        <Button
          type="button"
          variant={activeSection === "reservations" ? "default" : "ghost"}
          onClick={() => setActiveSection("reservations")}
          className="h-8 rounded-md px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2"
        >
          Reservations
        </Button>
      </div>

      {/* Placeholder for Table Content */}
      <ScrollArea>
        <ScrollBar orientation="horizontal" />
        <div className="min-h-[200px]">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {data.type === "users" && <UsersTable users={data.data} />}
              {data.type === "accommodations" && (
                <AccommodationsTable accommodations={data.data} />
              )}
              {data.type === "reservations" && (
                <ReservationsTable reservations={data.data} />
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// Users Table Component
function UsersTable({ users }: { users: User[] }) {
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Password Reset</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isEmailVerified ? "Yes" : "No"}</TableCell>
            <TableCell>
              {new Date(user.lastPasswordReset).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(user.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Accommodations Table Component
function AccommodationsTable({
  accommodations,
}: {
  accommodations: Accommodation[]
}) {
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Amenities</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accommodations.map((accommodation) => (
          <TableRow key={accommodation.id}>
            <TableCell>{accommodation.id}</TableCell>
            <TableCell>{accommodation.title}</TableCell>
            <TableCell>{accommodation.description || "N/A"}</TableCell>
            <TableCell>{accommodation.price} Php</TableCell>
            <TableCell>
              {accommodation.amenities.join(", ") || "None"}
            </TableCell>
            <TableCell>
              {new Date(accommodation.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(accommodation.updatedAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Reservations Table Component
function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Guests</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
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
