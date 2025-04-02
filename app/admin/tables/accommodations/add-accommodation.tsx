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
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AmenitiesSelection from "./amenities-selection"
import ImageUpload from "./image-upload"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { createAccommodation } from "@/app/actions"
import Spinner from "@/components/icons/spinner"

export type Fields = {
  image: string | null
  title: string
  description: string
  slug: string
  amenities: string[]
  numberOfBeds: number
  price: number
  virtualPath: string
}

export function AddAccommodation() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const initialFields: Fields = {
    image: null,
    title: "",
    description: "",
    slug: "",
    amenities: [],
    numberOfBeds: 0,
    price: 0,
    virtualPath: "cottage-5",
  }

  const [fields, setFields] = useState<Fields>(initialFields)

  const handleFieldChange = (
    field: string,
    value: string | number | string[] | null
  ) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await createAccommodation(fields)
      if (!response.success) {
        toast({
          title: "Error",
          variant: "destructive",
          description: response.message,
        })
      } else {
        toast({
          title: "Success",
          description: response.message,
          variant: "success",
        })
        setFields(initialFields)
        setOpen(false)
        location.reload()
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button
            type="button"
            className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus /> Add accommodation
          </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] h-auto">
        <DialogHeader>
          <DialogTitle>Add New Accommodation</DialogTitle>
          <DialogDescription>
            Fill in the details for the new accommodation. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto h-full">
          <div className="flex flex-col gap-2">
            <ImageUpload
              image={fields.image || ""}
              handleFieldChange={handleFieldChange}
            />
            <div>
              <Label>Title</Label>
              <Input
                value={fields.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Enter accommodation title"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={fields.slug}
                onChange={(e) => handleFieldChange("slug", e.target.value)}
                placeholder="Enter accommodation slug"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                cols={6}
                value={fields.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                placeholder="Enter accommodation description"
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
                  handleFieldChange("numberOfBeds", parseInt(e.target.value, 10))
                }
                placeholder="Enter number of beds"
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
                placeholder="Enter price"
              />
            </div>
            <div>
              <Label>Virtual path</Label>
              <Input
                value={fields.virtualPath}
                onChange={(e) => handleFieldChange("virtualPath", e.target.value)}
                placeholder="Enter virtual path"
                disabled
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? <Spinner /> : "Add Accommodation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
