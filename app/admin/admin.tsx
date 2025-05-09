"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Accommodation, Reservation, Review, User } from "@prisma/client"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import UsersTable from "./tables/users/users"
import AccommodationsTable from "./tables/accommodations/accommodations"
import ReservationsTable from "./tables/reservations/reservations"
import { ArrowDownAZ, ArrowDownZA, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAdminFilterStore } from "@/stores/admin-filter"
import { Tab } from "./page"
import { useRouter } from "next/navigation"
import { AddAccommodation } from "./tables/accommodations/add-accommodation"
import ReviewsTable from "./tables/reviews"
import GenerateReport from "./tables/reservations/generate-report"

export type ReservationTable = Reservation & {
  user: User
  accommodation: Accommodation
  proofPayment: string | null
}

// Define a discriminated union type for the data state
export type AdminData =
  | { type: "users"; data: User[] }
  | { type: "accommodations"; data: Accommodation[] }
  | { type: "reservations"; data: ReservationTable[] }
  | { type: "reviews"; data: (Review & { user: User })[] }

type AdminProps = {
  data: AdminData
  defaultTab: Tab
}

export function Admin({ data, defaultTab }: AdminProps) {
  const { activeSection, setSort, sort, search, setSearch, setActiveSection } =
    useAdminFilterStore()
  const router = useRouter()

  React.useEffect(() => {
    if (activeSection !== defaultTab) {
      setActiveSection(defaultTab)
    }
  }, [defaultTab, setActiveSection, activeSection])

  const handleTabChange = (tab: Tab) => {
    router.push(`/admin?tab=${tab}`)
  }

  return (
    <div>
      {/* Section Buttons */}
      <div className="flex gap-2 justify-between flex-col md:flex-row">
        <div className="flex items-center order-2 md:order-1">
          <Button
            type="button"
            variant={activeSection === "users" ? "secondary" : "default"}
            onClick={() => handleTabChange("users")}
            className={cn(
              "h-8 rounded-xl px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2 rounded-br-none rounded-bl-none rounded-tr-none bg-white",
              activeSection !== "users" && "bg-amber-900 hover:bg-amber-950",
              activeSection === "users" && "hover:bg-white"
            )}
          >
            Users
          </Button>
          <Button
            type="button"
            variant={
              activeSection === "accommodations" ? "secondary" : "default"
            }
            onClick={() => handleTabChange("accommodations")}
            className={cn(
              "h-8 px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2 rounded-none bg-white",
              activeSection !== "accommodations" &&
                "bg-amber-900 hover:bg-amber-950",
              activeSection === "accommodations" && "hover:bg-white"
            )}
          >
            Accommodations
          </Button>
          <Button
            type="button"
            variant={activeSection === "reservations" ? "secondary" : "default"}
            onClick={() => handleTabChange("reservations")}
            className={cn(
              "h-8 px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2 rounded-none bg-white",
              activeSection !== "reservations" &&
                "bg-amber-900 hover:bg-amber-950",
              activeSection === "reservations" && "hover:bg-white"
            )}
          >
            Reservations
          </Button>
          <Button
            type="button"
            variant={activeSection === "reviews" ? "secondary" : "default"}
            onClick={() => handleTabChange("reviews")}
            className={cn(
              "h-8 rounded-xl px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2 rounded-tl-none rounded-bl-none rounded-br-none bg-white",
              activeSection !== "reviews" && "bg-amber-900 hover:bg-amber-950",
              activeSection === "reviews" && "hover:bg-white"
            )}
          >
            Reviews
          </Button>
        </div>

        <div className="-translate-y-3 flex items-center gap-2 w-full max-w-[700px] order-1 md:order-2">
          <Button
            type="button"
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white"
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          >
            Sort {activeSection === "users" && "username"}
            {activeSection === "accommodations" && "price"}
            {activeSection === "reservations" && "booked by"}
            {activeSection === "reviews" && "rating"}
            {sort === "asc" ? <ArrowDownZA /> : <ArrowDownAZ />}
          </Button>
          <div className="flex items-center  bg-white rounded-md pl-3 focus-within:ring-gray-400 focus-within:ring-2 w-full">
            <Search className="text-black/50" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${
                activeSection === "users"
                  ? "username"
                  : activeSection === "accommodations"
                    ? "title"
                    : activeSection === "reservations"
                      ? "booked by"
                      : "user"
              }`}
              className="text-black border-none focus-visible:ring-0 min-w-0 w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-white text-black rounded-xl rounded-tl-none p-3 md:p-4">
        {/* Placeholder for Table Content */}
        <ScrollArea>
          <ScrollBar orientation="horizontal" />
          <div className="min-h-[200px]">
            {data.type === "users" && <UsersTable users={data.data} />}
            {data.type === "accommodations" && (
              <AccommodationsTable accommodations={data.data} />
            )}
            {data.type === "reservations" && (
              <ReservationsTable reservations={data.data} />
            )}
            {data.type === "reviews" && <ReviewsTable reviews={data.data} />}
          </div>
        </ScrollArea>
        {activeSection === "accommodations" && <AddAccommodation />}
        {activeSection === "reservations" && data.type === "reservations" && (
          <GenerateReport reservations={data.data} />
        )}
      </div>
    </div>
  )
}
