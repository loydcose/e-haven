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
import { useState } from "react"
import SubmitButton from "./submit-button"

export type Fields = {
  image: string
  title: string
  description: string
  slug: string
  amenities: string[]
  numberOfBeds: number
  price: number
  virtualPath: string
}

const extractNumberOfBeds = (amenities: string[]): number => {
  const bedAmenity = amenities.find((amenity) => amenity.match(/^\d+x bed$/i))
  if (bedAmenity) {
    const match = bedAmenity.match(/^(\d+)x bed$/i)
    return match ? parseInt(match[1], 10) : 0
  }
  return 0
}

export function AccommodationsAction({
  accommodation,
}: {
  accommodation: Accommodation
}) {
  const [fields, setFields] = useState<Fields>({
    image: accommodation.image,
    title: accommodation.title,
    description: accommodation.description || "",
    slug: accommodation.slug,
    amenities: accommodation.amenities,
    numberOfBeds: extractNumberOfBeds(accommodation.amenities),
    price: accommodation.price,
    virtualPath: accommodation.virtualPath,
  })

  const handleFieldChange = (
    field: string,
    value: string | number | string[] | null
  ) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <ImageUpload
              image={fields.image}
              handleFieldChange={handleFieldChange}
            />
            <div>
              <Label>Id</Label>
              <Input value={accommodation.id} disabled />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={fields.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={fields.slug}
                onChange={(e) => handleFieldChange("slug", e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                cols={6}
                value={fields.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Amenities</Label>
              <AmenitiesSelection
                amenities={fields.amenities}
                handleFieldChange={handleFieldChange}
              />
            </div>
            <div>
              <Label>No. of bed</Label>
              <Input
                type="number"
                value={fields.numberOfBeds}
                onChange={(e) =>
                  handleFieldChange(
                    "numberOfBeds",
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
            <div>
              <Label>Price (in peso)</Label>
              <Input
                type="number"
                value={fields.price}
                onChange={(e) =>
                  handleFieldChange("price", parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <Label>Virtual path</Label>
              <Input value={fields.virtualPath} disabled />
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row">
          <Button type="submit" variant={"destructive"}>
            {"Delete accommodation"}
          </Button>

          <SubmitButton fields={fields} accommodationId={accommodation.id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
