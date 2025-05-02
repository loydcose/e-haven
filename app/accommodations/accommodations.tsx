"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { CircleCheck, CircleCheckBig, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AmenitiesSelection } from "./amenities-selection"
import { BedsSelection } from "./beds-selection"
import { DateSelection } from "./date-selection"
import { useAccommodationFilterStore } from "@/stores/accommodation-filter"
import { useEffect, useState } from "react"
import { AccommodationWithReservation } from "./page"

export default function Accommodations({
  accommodations,
}: {
  accommodations: AccommodationWithReservation[]
}) {
  const {
    noOfBed,
    amenities,
    dateRange,
    setNoOfBed,
    setAmenities,
    setDateRange,
  } = useAccommodationFilterStore()
  const [filteredAccommodations, setFilteredAccommodations] =
    useState<AccommodationWithReservation[]>(accommodations)

  // Check if all filters are in their default state
  // const isDefaultFilters =
  // noOfBed === 0 && amenities.length === 0 && !dateRange.from && !dateRange.to

  // Reset filters to their default values
  const handleReset = () => {
    setNoOfBed(null)
    setAmenities([])
    setDateRange({ from: undefined, to: undefined })
  }

  useEffect(() => {
    // Perform filtering based on the filters in the store
    const filtered = accommodations.filter((accom) => {
      // Filter by number of beds
      const matchesBeds =
        noOfBed === null
          ? true // Display all accommodations when noOfBed is null
          : noOfBed === 0
            ? !accom.amenities.some((amenity) => /^(\d+)x bed$/.test(amenity)) // No bed label
            : accom.amenities.some((amenity) => {
                const bedMatch = amenity.match(/^(\d+)x bed$/) // Match strings like "2x bed"
                return bedMatch ? parseInt(bedMatch[1], 10) >= noOfBed : false
              })

      // Filter by amenities (if amenities array is not empty)
      const matchesAmenities =
        amenities.length === 0 ||
        amenities.every((amenity) => accom.amenities.includes(amenity))

      // Filter by date range (if both from and to dates are defined)
      const matchesDateRange =
        !dateRange.from ||
        !dateRange.to ||
        accom.reservations.every(
          (reservation) =>
            (dateRange.from && reservation.checkOut < dateRange.from) || // Reservation ends before the selected range starts
            (dateRange.to && reservation.checkIn > dateRange.to) // Reservation starts after the selected range ends
        )

      return matchesBeds && matchesAmenities && matchesDateRange
    })

    setFilteredAccommodations(filtered)
  }, [accommodations, noOfBed, amenities, dateRange])
  return (
    <>
      <div className="flex items-center gap-2 mb-6 md:mb-8 flex-wrap">
        <AmenitiesSelection />
        <BedsSelection />
        <DateSelection />
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {filteredAccommodations.length === 0 ? (
        <div className="py-16 md:py-24">
          <p className="text-center text-gray-500">No accommodations found.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-16 md:gap-20">
          {filteredAccommodations.map((accom, index) => (
            <li
              key={accom.id}
              className="flex flex-col md:flex-row gap-4 md:gap-12"
            >
              <div
                className={`aspect-square grow shrink-0 w-full max-w-[350px] rounded-2xl overflow-hidden ${
                  index % 2 === 0 ? "order-1" : "order-1 md:order-2"
                }`}
              >
                <Image
                  src={accom.image}
                  alt={`${accom.title}'s image`}
                  width={400}
                  height={400}
                  className="size-full object-cover"
                />
              </div>

              <div
                className={`${
                  index % 2 === 0 ? "order-1 md:order-2" : "order-1"
                }`}
              >
                <h2 className="mb-2 md:mb-4 font-bold text-2xl md:text-3xl tracking-tight">
                  {accom.title}
                </h2>
                <p className="mb-4 md:mb-6">{accom.description}</p>
                <ul className="flex items-center gap-2 flex-wrap mb-4 md:mb-6">
                  {accom.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2">
                      <CircleCheckBig className="text-green-600" />
                      {amenity}
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <CircleCheck className="text-green-600" />{" "}
                    <span>Up to {accom.maxCapacity} PAX</span>
                  </li>
                </ul>
                <div className="flex items-center gap-2 mb-2">
                  <Tag />
                  <span className="font-bold text-lg md:text-xl">
                    PHP {accom.price}
                  </span>
                </div>
                <Link
                  href={`/reservation/${accom.slug}`}
                  className={`${buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}`}
                >
                  BOOK NOW
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
