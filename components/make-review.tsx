"use client"

import React, { useState } from "react"
import StarFilled from "./icons/star-filled"
import { Button } from "./ui/button"
import StarUnfilled from "./icons/star-unfilled"
import { Textarea } from "./ui/textarea"
import { addReview, getUserFromToken } from "../app/actions"
import { useToast } from "@/hooks/use-toast"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

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

import Spinner from "./icons/spinner"

export default function MakeReview() {
  const [rating, setRating] = useState(0) // State for the selected rating
  const [hoverRating, setHoverRating] = useState(0) // State for hover effect
  const [comment, setComment] = useState("") // State for the review comment
  const [isDialogOpen, setIsDialogOpen] = useState(false) // State for success dialog visibility
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false) // State for alert dialog visibility
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const [isLoadingConfirmation, setIsLoadingConfirmation] = useState(false)
  const { toast } = useToast() // Initialize the toast hook

  const handleSubmit = async (overwrite = false) => {
    if (!rating || !comment.trim()) {
      toast({
        title: "Error",
        description: "Please provide a rating and a comment.",
        variant: "destructive",
      })
      return
    }

    const payload = await getUserFromToken()
    if (!payload) {
      toast({
        title: "Error",
        description: "Please log in to leave a review.",
        variant: "destructive",
      })
      return
    }

    if (overwrite) {
      setIsLoadingConfirmation(true) // Start loading for confirmation dialog
    } else {
      setIsLoading(true) // Start loading for the main submit button
    }

    try {
      // Call the addReview function
      const result = await addReview(
        payload.id as string,
        { rating, comment },
        overwrite
      )

      if (result.success) {
        setIsDialogOpen(true) // Open the success dialog
        setRating(0) // Reset the rating
        setComment("") // Reset the comment
      } else if (result.message === "You have already submitted a review.") {
        // Show alert dialog for overwrite confirmation
        setIsAlertDialogOpen(true)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    } finally {
      if (overwrite) {
        setIsLoadingConfirmation(false) // Stop loading for confirmation dialog
      } else {
        setIsLoading(false) // Stop loading for the main submit button
      }
    }
  }
  return (
    <div className="md:mt-16 bg-amber-900 rounded-xl p-6 md:p-8 text-white h-fit">
      <h4 className="text-center font-bold text-xl md:text-2xl mb-4 md:mb-6">
        We appreciate your input. Please tell us about your visit
      </h4>
      <div className="flex items-center gap-3 justify-center mb-3 md:mb-4">
        <p>Rate: </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              onMouseEnter={() => setHoverRating(star)} // Set hover rating
              onMouseLeave={() => setHoverRating(0)} // Reset hover rating
              onClick={() => setRating(star)} // Set selected rating
              className="cursor-pointer"
            >
              {hoverRating >= star || rating >= star ? (
                <StarFilled className="size-[16px] md:size-[18px]" />
              ) : (
                <StarUnfilled className="size-[16px] md:size-[18px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
        <Textarea
          placeholder="Write your review..."
          className="placeholder:text-white/50 min-h-56"
          value={comment}
          onChange={(e) => setComment(e.target.value)} // Update comment state
        />
      </div>

      <div className="w-full md:w-fit mx-auto">
        <Button
          type="button"
          className="font-bold w-full md:w-fit flex items-center justify-center gap-2"
          variant={"secondary"}
          onClick={() => handleSubmit()} // Handle form submission
          disabled={isLoading} // Disable button while loading
        >
          {isLoading && <Spinner />} {/* Show spinner */}
          Submit
        </Button>
      </div>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Submitted!</DialogTitle>
            <DialogDescription className="text-black/75">
              Thank you for sharing your feedback! Your review has been
              submitted and will be reviewed shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for Overwrite Confirmation */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overwrite Review</AlertDialogTitle>
            <AlertDialogDescription>
              You have already submitted a review. Do you want to overwrite your
              existing review with this one?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="secondary"
                onClick={() => setIsAlertDialogOpen(false)}
                disabled={isLoadingConfirmation} // Disable cancel button while loading
              >
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="default"
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  handleSubmit(true) // Submit with overwrite set to true
                }}
                disabled={isLoadingConfirmation} // Disable confirm button while loading
              >
                {isLoadingConfirmation && <Spinner />} {/* Show spinner */}
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
