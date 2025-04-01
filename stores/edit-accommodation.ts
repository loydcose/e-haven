import { create } from "zustand"

type AccommodationFormState = {
  image: string | null
  title: string
  slug: string
  description: string
  amenities: string[]
  numberOfBeds: number
  price: number
  virtualPath: string
  hasChange: boolean // New property to track changes
  setImage: (image: string | null) => void
  setTitle: (title: string) => void
  setSlug: (slug: string) => void
  setDescription: (description: string) => void
  setAmenities: (amenities: string[]) => void
  setNumberOfBeds: (numberOfBeds: number) => void
  setPrice: (price: number) => void
  setVirtualPath: (virtualPath: string) => void
  setHasChange: (hasChange: boolean) => void // Setter for hasChange
  resetForm: () => void
}

export const useEditAccommodation = create<AccommodationFormState>((set) => ({
  image: null,
  title: "",
  slug: "",
  description: "",
  amenities: [],
  numberOfBeds: 0,
  price: 0,
  virtualPath: "",
  hasChange: false, // Initialize hasChange to false
  setImage: (image) => set({ image, hasChange: true }),
  setTitle: (title) => set({ title, hasChange: true }),
  setSlug: (slug) => set({ slug, hasChange: true }),
  setDescription: (description) => set({ description, hasChange: true }),
  setAmenities: (amenities) => set({ amenities, hasChange: true }),
  setNumberOfBeds: (numberOfBeds) => set({ numberOfBeds, hasChange: true }),
  setPrice: (price) => set({ price, hasChange: true }),
  setVirtualPath: (virtualPath) => set({ virtualPath, hasChange: true }),
  setHasChange: (hasChange) => set({ hasChange }), // Setter for hasChange
  resetForm: () =>
    set({
      image: null,
      title: "",
      slug: "",
      description: "",
      amenities: [],
      numberOfBeds: 0,
      price: 0,
      virtualPath: "",
      hasChange: false, // Reset hasChange to false
    }),
}))
