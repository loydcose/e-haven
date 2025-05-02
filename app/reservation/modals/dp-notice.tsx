import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Modal } from "../submit-btn"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function DPNotice({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<Modal | null>>
}) {
  return (
    <AlertDialog defaultOpen onOpenChange={(v) => !v && setShowModal(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Down Payment Notice</AlertDialogTitle>
          <AlertDialogDescription>
            Before proceeding with your reservation, please note that 50% down
            payment is required to process your booking.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <h4 className="mt-8 text-lg md:text-xl font-bold mb-6 md:mb-8 text-center">
            Total Amount To Be Paid
          </h4>
          <div className="w-fit mx-auto">
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <p className="text-gray-600">Cozy hut Cottage x1</p>
              <p className="font-bold">PHP 1,000</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <p className="text-gray-600">Included PAX (Adult) x5</p>
              <p className="font-bold">PHP 500</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
              <p className="text-gray-600">Included PAX (Kids) x5</p>
              <p className="font-bold">PHP 350</p>
            </div>
          </div>

          <p className="text-center mb-6">Total: PHP 1,850</p>

          <p className="text-center mb-10 text-lg md:text-xl font-bold">
            Total Down Payment (50%): PHP 925
          </p>

          <div>
            <Label id="voucher">Discount/Voucher Codes (Optional)</Label>
            <Input name="voucher" placeholder="Enter code" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setShowModal("payment")}>
            Proceed to Payment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
