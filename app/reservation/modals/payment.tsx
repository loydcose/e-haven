import { useState } from "react"
import {
  AlertDialog,
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
import Spinner from "@/components/icons/spinner"
import { Button } from "@/components/ui/button"
import { addReservation } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

export function Payment({
  setShowModal,
  totalAmount,
  reservationData,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
  totalAmount: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reservationData: any
}) {
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && !file.type.match(/^image\/(jpg|jpeg|png|gif)$/)) {
      setError("Please upload a valid image file (jpg, jpeg, png, gif).")
      setProofOfPayment(null)
      return
    }
    setError("")
    setProofOfPayment(file)
  }

  const handleDone = async () => {
    if (!proofOfPayment) {
      setError("Please upload a proof of payment before proceeding.")
      return
    }
    setError("")

    setIsLoading(true)

    // add reservation to database
    try {
      reservationData.totalPrice = totalAmount
      const response = await addReservation(reservationData)
      if (response.success) {
        setShowModal("reservationDone")
        console.log("Done")
      } else {
        toast({
          title: "Failed to add reservation",
          description: response.message,
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

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
            PHP {new Intl.NumberFormat("en-US").format(totalAmount / 2)}
          </p>
          <div>
            <Label htmlFor="proofOfPayment">
              Proof of Payment <span className="text-red-600">*</span>
            </Label>
            <Input
              type="file"
              id="proofOfPayment"
              accept="image/jpg,image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" onClick={handleDone} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Done"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
