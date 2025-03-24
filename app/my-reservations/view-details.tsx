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

export function ViewDetails() {
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
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 w-full">
            <div className="aspect-[4:3] h-full w-full md:w-auto">
              <Image
                src="/my-reservations/img1.png"
                alt="my reservation 1"
                width={253}
                height={163}
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2 mb-2 md:mb-3 w-full flex-wrap">
                <h3 className="text-lg md:text-xl font-bold">
                  Nipa Hut Cottage
                </h3>
                <span className="ml-auto bg-amber-500 text-white rounded-full px-2 py-1 text-sm">
                  Waiting to accept
                </span>
              </div>
              <p className="font-bold text-green-600">600 php</p>
            </div>
          </div>

          {/* dates */}
          <div className="flex flex-col gap-2 md:gap-4">
            <div>
              <h4 className="font-bold">Check In</h4>
              <p>August 23, 2024</p>
            </div>
            <div>
              <h4 className="font-bold">Check In</h4>
              <p>August 23, 2024</p>
            </div>
          </div>

          {/* customer information */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Customer Information</h4>
            <p>Angelo S. Solomon</p>
            <p>Sitio Brgy Purok, Mambugan, Antipolo City, Rizal</p>
            <p>angelo@gmail.com</p>
            <p>03/26/2002</p>
          </div>

          {/* guest information */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Guest Information</h4>
            <div className="mb-2 md:mb-4">
              <p>Angelo S. Solomon</p>
              <p>03/26/2002</p>
            </div>
            <div>
              <p>Angelo S. Solomon</p>
              <p>03/26/2002</p>
            </div>
          </div>

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
            <Button
              type="button"
              className="w-full sm:w-fit bg-red-600 text-white hover:bg-amber-700"
            >
              Delete this reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </ScrollArea>
    </Dialog>
  )
}
