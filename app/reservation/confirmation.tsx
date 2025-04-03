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
import type { Accommodation } from "@prisma/client"

export function Confirmation({
  confirmationOpen,
  setConfirmationOpen,
  reservationData,
  accommodation,
  userId,
}: {
  confirmationOpen: boolean
  setConfirmationOpen: (value: boolean) => void
  reservationData: any
  accommodation: Accommodation
  userId: string
}) {
  const { toast } = useToast()

  const handleConfirm = async () => {
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
    } catch (error) {
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
            Are you sure you want to proceed with this reservation? This will add the reservation to your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex">
          <CircleCheckBig className="text-green-600 m-auto" size={90} />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
