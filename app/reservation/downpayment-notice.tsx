import FacebookIcon from "@/components/icons/facebook-icon"
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
import { Button } from "@/components/ui/button"
import { MessageCircleMore } from "lucide-react"

export function DownPaymentNotice({
  dpNoticeOpen,
  setDpNoticeOpen,
  setConfirmationOpen,
}: {
  dpNoticeOpen: boolean
  setDpNoticeOpen: (value: boolean) => void
  setConfirmationOpen: (value: boolean) => void
}) {
  return (
    <AlertDialog open={dpNoticeOpen}>
      <AlertDialogContent className="rounded-lg mx-auto w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Down Payment Notice</AlertDialogTitle>
          <AlertDialogDescription>
            Your reservation has been successfully added. Kindly settle the down
            payment to confirm your reservation.
            <br />
            <br />
            You can confirm your reservation by reaching out through our contact
            pages below:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            className="h-12 flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <FacebookIcon /> Nature&apos;s Haven Resort
          </Button>
          <Button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 text-white h-12 flex items-center gap-2"
          >
            <MessageCircleMore /> 099102937128
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDpNoticeOpen(false)}>
            Cancel reservation
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setDpNoticeOpen(false)
              setConfirmationOpen(true)
            }}
          >
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
