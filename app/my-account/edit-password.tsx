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

export function EditPassword() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white md:mt-6">
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
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
