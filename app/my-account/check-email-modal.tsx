"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CheckEmailModal({
  checkEmailModalOpen,
  setCheckEmailModalOpen,
  email,
}: {
  checkEmailModalOpen: boolean
  setCheckEmailModalOpen: (open: boolean) => void
  email: string
}) {
  console.log({checkEmailModalOpen})
  return (
    <Dialog open={checkEmailModalOpen} onOpenChange={setCheckEmailModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>We sent an email</DialogTitle>
        </DialogHeader>
        <p>
          We sent an email to <b>{email}</b>, kindly check your inbox.
        </p>
      </DialogContent>
    </Dialog>
  )
}
