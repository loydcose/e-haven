import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CircleCheckBig } from "lucide-react"
import { addReservation } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { getDaysReserved } from "@/lib/utils"

export function Confirmation({
  confirmationOpen,
  reservationData,
  accommodationPrice,
}: {
  confirmationOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reservationData: any
  accommodationPrice: number
}) {
  const { toast } = useToast()

  const handleConfirm = async () => {
    const daysReserved = getDaysReserved(
      reservationData.checkIn,
      reservationData.checkOut
    )

    reservationData.totalPrice = accommodationPrice * daysReserved

    // for guests/pax, 100php each
    reservationData.totalPrice += reservationData.guests.length * 100

    try {
      const response = await addReservation(reservationData)
      if (response.success) {
        toast({
          title: "Reservation added successfully",
          variant: "success",
        })
        location.href = "/my-reservations"
      } else {
        toast({
          title: "Failed to add reservation",
          description: response.message,
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <AlertDialog open={confirmationOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Reservation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed with this reservation? This will
            add the reservation to your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex">
          <CircleCheckBig className="text-green-600 m-auto" size={90} />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
