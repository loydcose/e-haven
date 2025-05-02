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
import { CircleHelp } from "lucide-react"

export function Confirmation({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
}) {
  return (
    <AlertDialog defaultOpen onOpenChange={(v) => !v && setShowModal(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Reservation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed with this reservation? This will
            add the reservation to your account
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex">
          <CircleHelp className="text-yellow-600 m-auto" size={90} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setShowModal("dpNotice")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
