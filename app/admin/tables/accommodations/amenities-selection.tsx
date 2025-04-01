"use client"
import React from "react"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"

const OPTIONS: Option[] = [
  { label: "Karaoke", value: "karaoke" },
  { label: "Billiards", value: "billiards" },
  { label: "Parking", value: "parking" },
  { label: "Cookstove", value: "cookstove" },
  { label: "Blanket and pillow", value: "blanketAndPillow" },
]

const AmenitiesSelection = ({ amenities }: { amenities: string[] }) => {
  // Normalize the amenities to lowercase for comparison
  const normalizedAmenities = amenities.map((amenity) => amenity.toLowerCase())

  // Map the amenities prop to the corresponding Option objects
  const defaultSelected = OPTIONS.filter((option) =>
    normalizedAmenities.includes(option.value)
  )

  const [value, setValue] = React.useState<Option[]>(defaultSelected)

  return (
    <MultipleSelector
      value={value}
      onChange={setValue}
      defaultOptions={OPTIONS}
      placeholder="Select amenities you like..."
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          no results found.
        </p>
      }
    />
  )
}

export default AmenitiesSelection
