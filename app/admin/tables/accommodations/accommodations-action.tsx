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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AmenitiesSelection from "./amenities-selection"
import ImageUpload from "./image-upload"

export function AccommodationsAction({
  accommodation,
}: {
  accommodation: Accommodation
}) {
  return (
    <Dialog defaultOpen>
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
      <DialogContent className="max-w-[600px] h-auto">
        <DialogHeader>
          <DialogTitle>
            Edit {accommodation.title}&apos;s Accommodation
          </DialogTitle>
          <DialogDescription>
            Make changes to accommodation here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto h-full">
          <div className="flex flex-col gap-2">
            <ImageUpload/>
            <div>
              <Label>Id</Label>
              <Input defaultValue={"asddadadadasdasdas"} disabled/>
            </div>
            <div>
              <Label>Title</Label>
              <Input defaultValue={"asddadadadasdasdas"} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input defaultValue={"asddadadadasdasdas"} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea />
            </div>
            <div>
              <Label>Amenities</Label>
              <AmenitiesSelection />
            </div>
            <div>
              <Label>No. of bed</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Price (in peso)</Label>
              <Input defaultValue={"asddadadadasdasdas"} type="number" />
            </div>
            <div>
              <Label>Virtual path</Label>
              <Input defaultValue={"asddadadadasdasdas"} />
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          <Button type="submit" variant={"destructive"}>
            {"Delete accommodation"}
          </Button>
          <Button type="submit">{"Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
