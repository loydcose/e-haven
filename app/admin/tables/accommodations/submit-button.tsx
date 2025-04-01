"use client"

import { Button } from "@/components/ui/button"
import { updateAccommodation } from "@/app/actions"
import { Fields } from "./accommodations-action"
import { useToast } from "@/hooks/use-toast"

export default function SubmitButton({
  hasChange,
  accommodationId,
  fields,
}: {
  hasChange: boolean
  accommodationId: string
  fields: Fields
}) {
  const { toast } = useToast()

  const handleClick = async () => {
    const result = await updateAccommodation(accommodationId, fields)
    console.log(fields)
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      })
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Button type="button" onClick={handleClick} disabled={!hasChange}>
      {"Save changes"}
    </Button>
  )
}
