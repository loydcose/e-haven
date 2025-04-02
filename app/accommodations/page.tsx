import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"

import React from "react"
import { getAccommodationsWithReservation } from "../actions"
import Accommodations from "./accommodations"
import { Accommodation, Reservation } from "@prisma/client"

export type AccommodationWithReservation = Accommodation & {
  reservations: Reservation[]
}

export const revalidate = 300

export default async function page() {
  const accommodations: AccommodationWithReservation[] = await getAccommodationsWithReservation()
  return (
    <main className="relative">
      <div className="bg-amber-800 absolute inset-0 -z-10"></div>

      <div className="mx-auto w-11/12 z-10 mb-16 md:mb-20">
        <NavBar />
        <div className="bg-black/60 p-10 md:p-16 text-white max-w-[1150px] mx-auto rounded-3xl">
          <h1 className="font-extrabold tracking-tight text-center text-4xl md:text-5xl mb-12 md:mb-20">
            Experience The Nature Of Beauty
          </h1>

          <Accommodations accommodations={accommodations} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
