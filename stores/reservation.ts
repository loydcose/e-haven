import { create } from "zustand"

type Guest = {
  id: string
  name: string
  birthday: Date | null
}

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
}))
