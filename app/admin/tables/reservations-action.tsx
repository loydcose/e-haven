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
import { Pencil } from "lucide-react"
import { ReservationTable } from "../admin"
import Image from "next/image"
import StatusSelection from "./status-selection"
import { userReservationStatusStore } from "@/stores/reservation-status"
import updateReservation from "@/app/actions"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Spinner from "@/components/icons/spinner"

export function ReservationAction({
  reservation,
}: {
  reservation: ReservationTable
}) {
  const user = reservation.user
  const accommodation = reservation.accommodation
  const { status, paymentMethod } = userReservationStatusStore()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const result = await updateReservation(reservation.id, {
        status: status || "pending",
        paymentMethod: paymentMethod,
        paymentDate: status !== "pending" ? new Date() : null,
      })

      if (result.success) {
        toast({
          title: "Success",
          description: "Reservation updated successfully.",
          variant: "success",
        })
        window.location.href = "/admin"
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
        <div>
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

          {/* status */}
          <h4 className="font-bold mb-2">Status</h4>
          <StatusSelection reservation={reservation} />
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          <Button type="submit" variant={"destructive"}>
            Delete reservation
          </Button>
          <Button type="submit" onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
