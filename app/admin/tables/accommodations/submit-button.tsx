"use client"

import { Button } from "@/components/ui/button"
import { updateAccommodation } from "@/app/actions"
import { Fields } from "./accommodations-action"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import Spinner from "@/components/icons/spinner"

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
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true) // Show the spinner
    try {
      const result = await updateAccommodation(accommodationId, fields)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "success",
        })
        setTimeout(() => {
          window.location.href = window.location.href
        }, 1000)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating accommodation:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false) // Hide the spinner
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={!hasChange || isLoading}
    >
      {isLoading ? <Spinner /> : "Save changes"}
    </Button>
  )
}
