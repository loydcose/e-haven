"use client"

import React, { useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Review, User } from "@prisma/client"
import { format } from "date-fns"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminFilterStore } from "@/stores/admin-filter"

type ReviewWithUser = Review & {
  user: User
}

interface ReviewsTableProps {
  reviews: ReviewWithUser[]
}

export default function ReviewsTable({ reviews }: ReviewsTableProps) {
  const { search, sort } = useAdminFilterStore()

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    // First filter by search term
    const filtered = reviews.filter((review) => {
      const searchTerm = search.toLowerCase()
      return (
        review.comment.toLowerCase().includes(searchTerm) ||
        review.user.firstName.toLowerCase().includes(searchTerm) ||
        review.user.lastName.toLowerCase().includes(searchTerm) ||
        review.rating.toString().includes(searchTerm) ||
        (review.visibility ? "visible" : "hidden").includes(searchTerm)
      )
    })

    // Then sort if needed
    if (sort) {
      filtered.sort((a, b) => {
        if (sort === "asc") {
          return a.comment.localeCompare(b.comment)
        } else {
          return b.comment.localeCompare(a.comment)
        }
      })
    }

    return filtered
  }, [reviews, search, sort])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">User</TableHead>
          <TableHead className="text-black">Rating</TableHead>
          <TableHead className="text-black">Comment</TableHead>
          <TableHead className="text-black">Visibility</TableHead>
          <TableHead className="text-black">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAndSortedReviews.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No reviews found
            </TableCell>
          </TableRow>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="text-black">{review.user.firstName} {review.user.lastName}</TableCell>
              <TableCell className="text-black">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-black max-w-md truncate">
                {review.comment}
              </TableCell>
              <TableCell className="text-black">
                {review.visibility ? "Visible" : "Hidden"}
              </TableCell>
              <TableCell className="text-black">
                {format(new Date(review.createdAt), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
} 