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

export function ReservationAction({
  reservation,
}: {
  reservation: ReservationTable
}) {
  const user = reservation.user
  const accommodation = reservation.accommodation

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
          <StatusSelection reservation={reservation}/>
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          <Button type="submit" variant={"destructive"}>
            Delete reservation
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
