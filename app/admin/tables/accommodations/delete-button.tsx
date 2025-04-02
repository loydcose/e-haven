import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteAccommodation } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import Spinner from "@/components/icons/spinner"
import { Button } from "@/components/ui/button"

export function DeleteButton({ accommodationId }: { accommodationId: string }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await deleteAccommodation(accommodationId)
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
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="submit" variant={"destructive"}>
          {"Delete accommodation"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete reservation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this accommodation? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="submit"
            onClick={handleDelete}
            disabled={loading}
            variant={"destructive"}
          >
            {loading ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
