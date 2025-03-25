import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="w-full h-8 rounded-lg bg-amber-800"/>
      ))}
    </div>
  )
}
