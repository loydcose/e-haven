import React from "react"
import Image from "next/image"
import { ViewDetails } from "./view-details"

export default function MyReservations() {
  return (
    <div className="mb-16 bg-amber-900 p-6 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl flex flex-col">
      <div className="mb-24 md:mb-32">
        <h2 className="font-bold text-xl md:text-2xl">Active</h2>
        <hr className="my-3 md:my-4 h-px border-0 bg-amber-700" />
        <ul className="flex flex-col gap-2 md:gap-4">
          <li className="flex-col md:flex-row flex items-start gap-2 md:gap-4 w-full">
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
              <div className="flex-col lg:flex-row flex items-start lg:items-center gap-2 mb-2 md:mb-3 w-full">
                <h3 className="text-lg md:text-xl font-bold">
                  Nipa Hut Cottage
                </h3>
                <span className="bg-amber-500 text-white rounded-full px-2 py-1 text-sm">
                  Waiting to accept
                </span>
                <p className="italic lg:ml-auto">August 23, 2024</p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <p>4x guests</p>
                <p className="font-bold">4x guests</p>
              </div>
              <ViewDetails />
            </div>
          </li>
        </ul>
      </div>

      {/* history */}
      <div>
        <h2 className="font-bold text-xl md:text-2xl">History</h2>
        <hr className="my-3 md:my-4 h-px border-0 bg-amber-700" />
        <ul className="flex flex-col gap-2 md:gap-4">
          <li className="flex-col md:flex-row flex items-start gap-2 md:gap-4 w-full">
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
              <div className="flex-col lg:flex-row flex items-start lg:items-center gap-2 mb-2 md:mb-3 w-full">
                <h3 className="text-lg md:text-xl font-bold">
                  Nipa Hut Cottage
                </h3>
                <span className="bg-amber-500 text-white rounded-full px-2 py-1 text-sm">
                  Waiting to accept
                </span>
                <p className="italic lg:ml-auto">August 23, 2024</p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <p>4x guests</p>
                <p className="font-bold">4x guests</p>
              </div>
              <ViewDetails />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
