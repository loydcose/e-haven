import { create } from "zustand"

type Status = "pending" | "accepted" | "paid" | null

type ReservationStatusStore = {
  status: Status
  setStatus: (status: Status) => void

  paymentMethod: string | null
  setPaymentMethod: (paymentMethod: string | null) => void
}

export const userReservationStatusStore = create<ReservationStatusStore>()(
  (set) => ({
    status: null,
    setStatus: (status) =>
      set((state) => ({
        status,
        paymentMethod: status === "pending" ? null : state.paymentMethod,
      })),

    paymentMethod: null,
    setPaymentMethod: (paymentMethod) => set(() => ({ paymentMethod })),
  })
)
