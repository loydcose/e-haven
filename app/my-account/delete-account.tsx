"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { deleteUserAccount } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function DeleteAccount({ userId }: { userId: string }) {
  const [confirmationText, setConfirmationText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [showDialog, setShowDialog] = useState(false) // Control dialog visibility
  const [showRedirectDialog, setRedirectDialog] = useState(false)

  const handleDeleteAccount = async () => {
    if (confirmationText !== "Delete") {
      toast({
        title: "Invalid confirmation",
        description: "You must type 'Delete' to confirm.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await deleteUserAccount(userId) // Replace with the actual user ID
      if (result.success) {
        setShowDialog(false) // Close the dialog on success
        setRedirectDialog(true) // Show the redirect dialog
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting account:", error)
      toast({
        title: "Server Error",
        description: "An error occurred while deleting your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="w-full md:w-fit"
            onClick={() => setShowDialog(true)} // Show the dialog when clicked
          >
            Delete my account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            <div className="py-4">
              <p className="mb-1">
                Type <b>&quot;Delete&quot;</b> to confirm the account deletion.
              </p>
              <Input
                type="text"
                placeholder="Type the keyword"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isLoading}
              onClick={() => setShowDialog(false)} // Close the dialog on cancel
            >
              Cancel
            </AlertDialogCancel>
            <Button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* redirect dialog */}
      <AlertDialog open={showRedirectDialog} onOpenChange={setRedirectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account deleted!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Your account has been deleted on our servers
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              className="w-full"
              onClick={() => (window.location.href = "/sign-in")}
            >
              Go back to sign in page
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
