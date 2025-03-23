import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import LoaderSpinner from "@/components/icons/spinner" // Assuming this is your spinner component
import { changePassword } from "../actions"

export function EditPassword({ userId }: { userId: string }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [showModal, setShowModal] = useState(false)

  const handleSaveChanges = async () => {
    setLoading(true)

    try {
      const response = await changePassword(userId, {
        currentPassword,
        password: newPassword,
        confirmPassword,
      })

      if (!response.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message,
        })
      } else {
        toast({
          variant: "success",
          title: "Success",
          description: response.message,
        })
        setShowModal(false)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white md:mt-6"
        >
          Change password
        </Button>
      </DialogTrigger>

      <DialogContent className="mx-auto w-[90%] max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>Edit your password below</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="currentPassword" className="text-right">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="newPassword" className="text-right">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <Label htmlFor="confirmPassword" className="text-right">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSaveChanges}
            disabled={loading}
            className="relative"
          >
            {loading ? <LoaderSpinner /> : "Save changes"}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
