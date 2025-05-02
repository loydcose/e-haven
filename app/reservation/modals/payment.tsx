import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Modal } from "../submit-btn"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Payment({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
}) {
  return (
    <AlertDialog defaultOpen onOpenChange={(v) => !v && setShowModal(null)}>
      <AlertDialogContent>
        <AlertDialogHeader className="bg-blue-600 rounded-md">
          <AlertDialogTitle>
            <div className="w-1/3 mx-auto">
              <Image
                src="/icons/gcash.png"
                alt="Gcash Icon"
                width={443}
                height={154}
                className="w-full object-cover"
              />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <div className="mx-auto w-[80%] sm:w-1/2">
            <Image
              src="/icons/qr-code.png"
              alt="Gcash QR Code"
              width={418}
              height={418}
              className="w-full object-cover"
            />
          </div>
          <p className="text-gray-600 mb-3 text-center">
            Transfer fees may apply.
          </p>
          <p className="mb-6 text-blue-700 text-lg md:text-xl font-bold text-center">
            PHP 1,750.00
          </p>
          <div>
            <Label htmlFor="proofOfPayment">
              Proof of Payment <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="proofOfPayment"
              placeholder="Upload proof of payment"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setShowModal("reservationDone")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
