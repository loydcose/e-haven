import { HealthLabel } from "@/lib/utils"
import { create } from "zustand"

type Guest = {
  id: string
  name: string
  birthday: Date | null
  gender: Gender
  healthIssue: HealthLabel | null
}

type Gender = "male" | "female" | null

type ReservationStore = {
  accommodationId: string
  userId: string
  checkIn: Date | null
  checkOut: Date | null
  address: string
  birthday: Date | null
  contactNumber: string
  guests: Guest[]
  totalPrice: number
  hasCheckAgreement: boolean
  gender: Gender
  healthIssue: HealthLabel | null
  setAccommodationId: (accommodationId: string) => void
  setUserId: (userId: string) => void
  setCheckIn: (checkIn: Date) => void
  setCheckOut: (checkOut: Date) => void
  setAddress: (address: string) => void
  setBirthday: (birthday: Date) => void
  setContactNumber: (contactNumber: string) => void
  addGuest: (guest: Guest) => void
  removeGuest: (index: number) => void
  updateGuest: (index: number, updatedGuest: Guest) => void // Added type for updateGuest
  setTotalPrice: (totalPrice: number) => void
  setHasCheckAgreement: (hasCheckAgreement: boolean) => void
  setGender: (gender: Gender) => void
  setHealthIssue: (healthIssue: HealthLabel) => void
}

export const useReservationStore = create<ReservationStore>()((set) => ({
  accommodationId: "",
  userId: "",
  checkIn: null,
  checkOut: null,
  address: "",
  birthday: null,
  contactNumber: "",
  guests: [],
  totalPrice: 0,
  hasCheckAgreement: false,
  gender: null,
  healthIssue: null,
  setAccommodationId: (accommodationId) => set(() => ({ accommodationId })),
  setUserId: (userId) => set(() => ({ userId })),
  setCheckIn: (checkIn) => set(() => ({ checkIn })),
  setCheckOut: (checkOut) => set(() => ({ checkOut })),
  setAddress: (address) => set(() => ({ address })),
  setBirthday: (birthday) => set(() => ({ birthday })),
  setContactNumber: (contactNumber) => set(() => ({ contactNumber })),
  addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
  removeGuest: (index) =>
    set((state) => ({
      guests: state.guests.filter((_, i) => i !== index),
    })),
  updateGuest: (index, updatedGuest) => {
    set((state) => {
      const guests = [...state.guests] // Create a shallow copy of the guests array
      guests[index] = updatedGuest // Update the specific guest
      return { guests } // Return the updated state
    })
  },
  setTotalPrice: (totalPrice) => set(() => ({ totalPrice })),
  setHasCheckAgreement: (hasCheckAgreement) =>
    set(() => ({ hasCheckAgreement })),
  setGender: (gender) => set(() => ({ gender })),
  setHealthIssue: (healthIssue) => set(() => ({ healthIssue })),
}))
