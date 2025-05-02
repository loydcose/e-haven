import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Modal } from "../submit-btn"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useReservationStore } from "@/stores/reservation"
import { getDaysReserved } from "@/lib/utils"
import { useEffect, useMemo } from "react"

export function DPNotice({
  setShowModal,
  accommodationPrice,
  setTotalAmount,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
  accommodationPrice: number
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>
}) {
  const { checkIn, checkOut, guests } = useReservationStore()

  const daysReserved = getDaysReserved(checkIn, checkOut)
  const accommodationPriceTotal = daysReserved * accommodationPrice
  const paxPriceTotal = guests.length * 100
  const totalAmount = accommodationPriceTotal + paxPriceTotal

  useEffect(() => {
    setTotalAmount(totalAmount)
  }, [totalAmount])

  const formattedAccommodationPriceTotal = useMemo(
    () => new Intl.NumberFormat("en-US").format(accommodationPriceTotal),
    [accommodationPriceTotal]
  )

  const formattedPaxPriceTotal = useMemo(
    () => new Intl.NumberFormat("en-US").format(paxPriceTotal),
    [paxPriceTotal]
  )

  const formattedTotalAmount = useMemo(
    () => new Intl.NumberFormat("en-US").format(totalAmount),
    [totalAmount]
  )

  const formattedDownPayment = useMemo(
    () => new Intl.NumberFormat("en-US").format(totalAmount / 2),
    [totalAmount]
  )

  return (
    <AlertDialog defaultOpen onOpenChange={(v) => !v && setShowModal(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Down Payment Notice</AlertDialogTitle>
          <AlertDialogDescription>
            Before proceeding with your reservation, please note that 50% down
            payment is required to process your booking.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <h4 className="mt-8 text-lg md:text-xl font-bold mb-6 md:mb-8 text-center">
            Total Amount To Be Paid
          </h4>
          <div className="w-fit mx-auto">
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-600 border p-2">
                Cozy hut Cottage x{daysReserved}(day/s)
              </p>
              <p className="font-bold border p-2">
                PHP {formattedAccommodationPriceTotal}
              </p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <p className="text-gray-600 border p-2">
                Included PAX x{guests.length}
              </p>
              <p className="font-bold border p-2">
                PHP {formattedPaxPriceTotal}
              </p>
            </div>
          </div>

          <p className="text-center mb-6">Total: PHP {formattedTotalAmount}</p>

          <p className="text-center mb-10 text-lg md:text-xl font-bold">
            Total Down Payment (50%): PHP {formattedDownPayment}
          </p>

          <div>
            <Label id="voucher">Discount/Voucher Codes (Optional)</Label>
            <Input name="voucher" placeholder="Enter code" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setShowModal("payment")}>
            Proceed to Payment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
