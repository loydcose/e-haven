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
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageCircleMore } from "lucide-react"
import Link from "next/link"

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
            Before proceeding with your reservation, please note that a down payment is required to confirm your booking.
            <br />
            <br />
            You can confirm your reservation by reaching out through our contact pages below:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61558015206603"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            )}
          >
            <FacebookIcon /> Nature&apos;s Haven Resort
          </Link>
          <Button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 text-white h-12 flex items-center gap-2"
          >
            <MessageCircleMore /> 099102937128
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDpNoticeOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setDpNoticeOpen(false)
              setConfirmationOpen(true)
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
