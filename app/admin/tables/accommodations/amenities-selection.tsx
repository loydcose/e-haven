"use client"
import React, { useEffect } from "react"
import MultipleSelector, { Option } from "@/components/ui/multiple-selector"

const options: Option[] = [
  { label: "Karaoke", value: "Karaoke" },
  { label: "Billiards", value: "Billiards" },
  { label: "Parking", value: "Parking" },
  { label: "Cookstove", value: "Cookstove" },
  { label: "Blanket and pillow", value: "Blanket and pillow" },
]

const AmenitiesSelection = ({
  amenities,
  handleFieldChange,
}: {
  amenities: string[]
  handleFieldChange: (field: string, value: string | number | string[]) => void
}) => {
  const defaultSelected = options.filter((option) =>
    amenities.includes(option.value)
  )

  const [value, setValue] = React.useState<Option[]>(defaultSelected)

  useEffect(() => {
    handleFieldChange(
      "amenities",
      value.map((v) => v.value)
    )
  }, [value])

  return (
    <MultipleSelector
      value={value}
      onChange={setValue}
      defaultOptions={options}
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
