import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteReservation } from "../actions"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import Spinner from "@/components/icons/spinner"
import { Button } from "@/components/ui/button"

export function ConfirmDeletion({ reservationId }: { reservationId: string }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteReservation(reservationId)
      if (!response.success) {
        toast({
          title: "Error",
          variant: "destructive",
          description: response.message,
        })
      } else {
        location.href = "/my-reservations"
      }
    } catch {
      toast({
        title: "Error",
        variant: "destructive",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="w-full sm:w-fit bg-red-600 text-white hover:bg-red-700"
        >
          Cancel this reservation
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete reservation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this reservation? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
