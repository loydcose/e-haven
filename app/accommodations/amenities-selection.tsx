"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown } from "lucide-react"
import { useAccommodationFilterStore } from "@/stores/accommodation-filter" // Import the store

const amenities = [
  "Karaoke",
  "Billiards",
  "Parking",
  "Cookstove",
  "Blanket and pillow",
]

export function AmenitiesSelection() {
  const { amenities: selectedAmenities, setAmenities } =
    useAccommodationFilterStore()

  const handleToggleAmenity = (amenity: string) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((item) => item !== amenity)
      : [...selectedAmenities, amenity]

    setAmenities(updatedAmenities)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" className="w-40 flex items-center gap-2">
          Select Amenities <ChevronsUpDown className="opacity-75" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <p className="font-bold mb-2">Select amenities</p>
        <div className="flex flex-col gap-2">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)} // Check if the amenity is selected
                onCheckedChange={() => handleToggleAmenity(amenity)} // Toggle the amenity
              />
              <Label
                htmlFor={amenity}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
