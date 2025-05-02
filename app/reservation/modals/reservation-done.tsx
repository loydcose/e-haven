import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Modal } from "../submit-btn"
import { CheckCircle2 } from "lucide-react"
import { useEffect } from "react"

export function ReservationDone({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/my-reservations"
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AlertDialog defaultOpen onOpenChange={(v) => !v && setShowModal(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Your reservation has been placed
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex mb-4">
          <CheckCircle2 className="text-green-600 m-auto" size={90} />
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please allow time for your payment to be verified before your
          reservation is finalized. If payment is not received within 24 hours,
          your reservation will be automatically forfeited.
        </p>
        <p className="text-center font-bold">Redirecting...</p>
      </AlertDialogContent>
    </AlertDialog>
  )
}
