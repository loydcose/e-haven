"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accommodation, Reservation, User } from "@prisma/client"
import { ConfirmDeletion } from "./confirm-deletion"

export function ViewDetails({
  reservation,
}: {
  reservation: Reservation & { accommodation: Accommodation } & {
    user: User
  }
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="w-fit bg-amber-700 text-white hover:bg-amber-800"
        >
          View Details
        </Button>
      </DialogTrigger>
      <ScrollArea className="rounded-md">
        <DialogContent className="h-[80%] overflow-y-auto w-[90%] rounded-md md:w-[75%] mx-auto max-w-auto">
          {/* Accommodation Details */}
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 w-full">
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
              <div className="flex items-center gap-2 mb-2 md:mb-3 w-full flex-wrap">
                <h3 className="text-lg md:text-xl font-bold">
                  {reservation.accommodation.title}
                </h3>
                <span
                  className={`ml-auto rounded-full px-2 py-1 text-sm ${
                    reservation.status === "pending"
                      ? "bg-orange-500 text-white"
                      : reservation.status === "accepted"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                  }`}
                >
                  {reservation.status === "pending"
                    ? "Waiting to accept"
                    : reservation.status === "accepted"
                      ? "Accepted"
                      : "Paid"}
                </span>
              </div>
              <p className="font-bold text-green-600">
                {reservation.totalPrice} php
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-2 md:gap-4">
            <div>
              <h4 className="font-bold">Check In</h4>
              <p>{new Date(reservation.checkIn).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="font-bold">Check Out</h4>
              <p>{new Date(reservation.checkOut).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Customer Information</h4>
            <p>
              {reservation.user?.firstName} {reservation.user?.lastName}
            </p>
            <p>{reservation.address}</p>
            <p>{reservation.user?.email}</p>
            <p>{new Date(reservation.birthday).toLocaleDateString()}</p>
            <p>{reservation.gender}</p>
            <p>{reservation.healthIssue}</p>
          </div>

          {/* Guest Information */}
          {Array.isArray(reservation.guests) &&
            reservation.guests.length > 0 && (
              <div className="flex flex-col gap-1">
                <h4 className="font-bold">Guest Information</h4>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {reservation.guests.map((guest: any, index: number) => (
                  <div key={index} className="mb-2 md:mb-4">
                    <p>{guest.name}</p>
                    <p>{new Date(guest.birthday).toLocaleDateString()}</p>
                    <p>{guest.gender}</p>
                    <p>{guest.healthIssue}</p>
                  </div>
                ))}
              </div>
            )}

          {reservation.proofPayment && (
            <div>
              <p className="font-bold mb-2">Proof of Payment</p>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-sm shadow-sm overflow-hidden">
                <Image
                  src={reservation.proofPayment}
                  alt="Proof of Payment"
                  width={400}
                  height={400}
                  className="size-full object-cover"
                />
              </div>
            </div>
          )}

          <DialogFooter className="justify-end flex items-center gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-fit"
              >
                Close
              </Button>
            </DialogClose>
            {reservation.status === "pending" && (
              <ConfirmDeletion reservationId={reservation.id} />
            )}
          </DialogFooter>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}
