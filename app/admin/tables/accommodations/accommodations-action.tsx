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
  // Extract the number of beds from the amenities array
  const extractNumberOfBeds = (amenities: string[]): number => {
    const bedAmenity = amenities.find((amenity) =>
      amenity.match(/^\d+x bed$/i)
    )
    if (bedAmenity) {
      const match = bedAmenity.match(/^(\d+)x bed$/i)
      return match ? parseInt(match[1], 10) : 0
    }
    return 0
  }

  const numberOfBeds = extractNumberOfBeds(accommodation.amenities || [])

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
            <ImageUpload accommodationImage={accommodation.image} />
            <div>
              <Label>Id</Label>
              <Input defaultValue={accommodation.id} disabled />
            </div>
            <div>
              <Label>Title</Label>
              <Input defaultValue={accommodation.title} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input defaultValue={accommodation.slug} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea cols={6} defaultValue={accommodation.description || ""} />
            </div>
            <div>
              <Label>Amenities</Label>
              <AmenitiesSelection amenities={accommodation.amenities || []} />
            </div>
            <div>
              <Label>No. of bed</Label>
              <Input type="number" defaultValue={numberOfBeds} />
            </div>
            <div>
              <Label>Price (in peso)</Label>
              <Input type="number" defaultValue={accommodation.price} />
            </div>
            <div>
              <Label>Virtual path</Label>
              <Input defaultValue={accommodation.virtualPath} disabled/>
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