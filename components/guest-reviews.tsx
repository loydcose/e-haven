"use client"

import { useEffect, useState } from "react"
import StarFilled from "./icons/star-filled"
import { Button } from "./ui/button"
import StarUnfilled from "./icons/star-unfilled"
import MakeReview from "./make-review"
import { getReviews } from "../app/actions" // Import the getReviews function
import { Review, User } from "@prisma/client"

export default function GuestReviews() {
  const [reviews, setReviews] = useState<(Review & { user: User })[]>([]) // State to store reviews
  const [page, setPage] = useState(1) // State to track the current page
  const [hasMore, setHasMore] = useState(true) // State to track if there are more reviews to load
  const [loading, setLoading] = useState(false) // State to track loading

  // Fetch reviews with pagination
  const fetchReviews = async (page: number) => {
    setLoading(true)
    try {
      const newReviews = await getReviews(page, 3) // Fetch 3 reviews per page
      setReviews((prevReviews) => [...prevReviews, ...newReviews]) // Append new reviews to the existing list
      if (newReviews.length < 3) {
        setHasMore(false) // If fewer than 3 reviews are returned, there are no more reviews to load
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch the initial reviews when the component mounts
  useEffect(() => {
    fetchReviews(page)
  }, [page])

  // Handle "See All" button click
  const handleSeeAll = () => {
    setPage((prevPage) => prevPage + 1) // Increment the page number to load more reviews
  }

  return (
    <div className="bg-amber-100 py-8 md:py-16">
      <section className="mx-auto w-11/12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="font-extrabold tracking-tight mb-4 md:mb-6 text-center text-3xl md:text-4xl">
            Guest Reviews
          </h2>

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-green-700 text-white mb-3 last:mb-6 bg-gree-700 rounded-xl p-3 md:p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-b-white/40 py-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <h4>
                        {review.user.firstName} {review.user.lastName}
                      </h4>
                      <p className="text-sm opacity-55">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, index) => (
                      <StarFilled
                        key={index}
                        className="size-[16px] md:size-[18px]"
                      />
                    ))}
                    {[...Array(5 - review.rating)].map((_, index) => (
                      <StarUnfilled
                        key={index}
                        className="size-[16px] md:size-[18px]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm opacity-90">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}

          {/* "See All" Button */}
          {reviews.length >= 3 && hasMore && (
            <div className="w-full md:w-fit mx-auto">
              <Button
                type="button"
                variant={"secondary"}
                className="w-full md:w-24 font-medium flex items-center justify-center gap-2"
                onClick={handleSeeAll}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Loading..." : "See All"}
              </Button>
            </div>
          )}
        </div>

        {/* contact section */}
        <MakeReview />
      </section>
    </div>
  )
}
