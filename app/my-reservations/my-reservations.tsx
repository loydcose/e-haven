import React from "react"
import Image from "next/image"
import { ViewDetails } from "./view-details"
import { getReservationsByUser, getUserFromToken } from "../actions"
import { Accommodation, Reservation, User } from "@prisma/client"

export type GuestType = {
  id: string
  name: string
  birthday: string
}

// Reusable component for rendering a reservation item
function ReservationItem({
  reservation,
  statusBadge,
}: {
  reservation: Reservation & { accommodation: Accommodation } & { user: User }
  statusBadge: React.ReactNode
}) {
  return (
    <li className="flex-col md:flex-row flex items-start gap-2 md:gap-4 w-full">
      <div className="aspect-[4:3] h-full w-full md:w-auto">
        <Image
          src={reservation.accommodation.image}
          alt={reservation.accommodation.title}
          width={253}
          height={163}
          className="w-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex-col lg:flex-row flex items-start lg:items-center gap-2 mb-2 md:mb-3 w-full">
          <h3 className="text-lg md:text-xl font-bold">
            {reservation.accommodation.title}
          </h3>
          {statusBadge}
          <p className="italic lg:ml-auto">
            {new Date(reservation.checkIn).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <p>
            {reservation.guests
              ? `${(reservation.guests as GuestType[]).length}x guests`
              : "No guests"}
          </p>
          <p className="font-bold">{reservation.totalPrice} Php</p>
        </div>
        <ViewDetails reservation={reservation} />
      </div>
    </li>
  )
}

export default async function MyReservations() {
  const user = await getUserFromToken()

  if (!user) {
    return <h1>Invalid token, no user found</h1>
  }

  const reservations = await getReservationsByUser(user.id as string)

  // Separate reservations by status
  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === "pending"
  )
  const historyReservations = reservations.filter(
    (reservation) =>
      reservation.status === "accepted" || reservation.status === "paid"
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-sm">
            Waiting to accept
          </span>
        )
      case "accepted":
        return (
          <span className="bg-green-500 text-white rounded-full px-2 py-1 text-sm">
            Accepted
          </span>
        )
      case "paid":
        return (
          <span className="bg-gray-500 text-white rounded-full px-2 py-1 text-sm">
            Paid
          </span>
        )
      default:
        return null
    }
  }

  return (
    <>
      {reservations.length === 0 && (
        <h2 className="text-center text-lg">
          You don&apos;t have any reservations yet. Start booking now!
        </h2>
      )}

      {/* Active or pending reservations */}
      {pendingReservations.length > 0 && (
        <div className="mb-24 md:mb-32">
          <h2 className="font-bold text-xl md:text-2xl">Active</h2>
          <hr className="my-3 md:my-4 h-px border-0 bg-amber-700" />
          <ul className="flex flex-col gap-2 md:gap-4">
            {pendingReservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
                statusBadge={getStatusBadge(reservation.status)}
              />
            ))}
          </ul>
        </div>
      )}

      {/* History or accepted, paid reservations */}
      {historyReservations.length > 0 && (
        <div>
          <h2 className="font-bold text-xl md:text-2xl">History</h2>
          <hr className="my-3 md:my-4 h-px border-0 bg-amber-700" />
          <ul className="flex flex-col gap-2 md:gap-4">
            {historyReservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
                statusBadge={getStatusBadge(reservation.status)}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
