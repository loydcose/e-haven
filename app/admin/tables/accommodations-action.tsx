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

import { Accommodation } from "@prisma/client"

export function AccommodationsAction({
  accommodation,
}: {
  accommodation: Accommodation
}) {
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
            Edit {accommodation.title}&apos;s Accommodation
          </DialogTitle>
          <DialogDescription>
            Make changes to accommodation here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <h4 className="font-bold mb-2">Accommodation</h4>
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          <Button type="submit">{"Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
