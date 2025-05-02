import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil } from "lucide-react"
import { ReservationTable } from "../../admin"
import Image from "next/image"
import { userReservationStatusStore } from "@/stores/reservation-status"
import updateReservation, { deleteReservation } from "@/app/actions"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Spinner from "@/components/icons/spinner"
import StatusSelection from "./status-selection"

export function ReservationAction({
  reservation,
}: {
  reservation: ReservationTable
}) {
  const user = reservation.user
  const accommodation = reservation.accommodation
  const { status } = userReservationStatusStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateReservation(reservation.id, {
        status: status || "pending",
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Reservation updated successfully.",
          variant: "success",
        })
        window.location.href = window.location.href
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update reservation.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteReservation(reservation.id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Reservation deleted successfully.",
          variant: "success",
        })
        window.location.href = window.location.href
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete reservation.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={"icon"}
          variant={"destructive"}
          className="rounded-full mx-auto"
        >
          <Pencil className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Edit {user.firstName} {user.lastName}&apos;s reservation
          </DialogTitle>
          <DialogDescription>
            Make changes to users reservation here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-full max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
          <h4 className="font-bold mb-2">Accommodation</h4>
          <div className="w-full aspect-[16/9] relative isolate mb-4 overflow-hidden rounded-xl">
            <Image
              src={accommodation.image}
              alt={accommodation.title}
              width={150}
              height={150}
              className="size-full object-cover -z-10"
            />
            <div className="absolute inset-0 flex bg-black/50">
              <p className="m-auto text-white text-lg md:text-xl font-bold">
                {accommodation.title}
              </p>
            </div>
          </div>

          {reservation.proofPayment && (
            <>
              <h4 className="font-bold mb-2">
                {user.firstName} {user.lastName}&apos;s Proof of Payment
              </h4>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-sm shadow-sm overflow-hidden mb-6">
                <Image
                  src={reservation.proofPayment}
                  alt="Proof of Payment"
                  width={400}
                  height={400}
                  className="size-full object-cover"
                />
              </div>
            </>
          )}

          {/* status */}
          <h4 className="font-bold mb-2">Status</h4>
          <StatusSelection reservation={reservation} />
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          {/* delete section */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                variant={"destructive"}
                disabled={isDeleting}
              >
                {isDeleting ? <Spinner /> : "Delete reservation"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete {user.firstName} {user.lastName}&apos;s reservation?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Are you sure you want to delete this reservation? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Spinner /> : "Delete"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
