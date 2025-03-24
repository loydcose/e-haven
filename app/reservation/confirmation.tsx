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

export function Confirmation({
  confirmationOpen,
}: {
  confirmationOpen: boolean
  setConfirmationOpen: (value: boolean) => void
}) {
  return (
    <AlertDialog open={confirmationOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmed</AlertDialogTitle>
          <AlertDialogDescription>
            Your reservation has been confirmed. Kindly wait for the host to
            accept your reservation.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex">
          <CircleCheckBig className="text-green-600 m-auto" size={90} />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => (location.href = "/my-reservations")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
