import React from "react"
import { getAccommodations } from "@/app/actions" // Import the function to fetch accommodations
import CarouselAccom from "./carousel-accom"

export default async function BestAccom() {
  // Fetch accommodations from the database
  const accommodations = await getAccommodations()

  return (
    <div className="bg-amber-900 py-8 md:py-16">
      <div className="mx-auto w-[80%] text-white">
        <h1 className="tracking-tight font-extrabold text-3xl md:text-4xl text-center mb-8 md:mb-16">
          See our best Accommodations
        </h1>

        <CarouselAccom accommodations={accommodations} />
      </div>
    </div>
  )
}
