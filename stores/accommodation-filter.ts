import { create } from "zustand"

type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

type AccommodationFilterStore = {
  noOfBed: number | null
  amenities: string[]
  dateRange: DateRange
  setNoOfBed: (noOfBed: number | null) => void
  setAmenities: (amenities: string[]) => void
  setDateRange: (dateRange: DateRange) => void
}

export const useAccommodationFilterStore = create<AccommodationFilterStore>()(
  (set) => ({
    noOfBed: null,
    amenities: [],
    dateRange: { from: undefined, to: undefined },

    setNoOfBed: (noOfBed) => set(() => ({ noOfBed })),
    setAmenities: (amenities) => set(() => ({ amenities })),
    setDateRange: (dateRange) => set(() => ({ dateRange })),
  })
)
