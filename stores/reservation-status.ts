import { create } from "zustand"

type Status = "pending" | "accepted" | "paid" | null

type ReservationStatusStore = {
  status: Status
  setStatus: (status: Status) => void
}

export const userReservationStatusStore = create<ReservationStatusStore>()(
  (set) => ({
    status: null,
    setStatus: (status) => set(() => ({ status })),
  })
)
