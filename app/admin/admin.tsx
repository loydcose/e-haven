"use client"

import React, { useEffect, useState } from "react"

import {
  getUsers,
  getAccommodations,
  getReservationsWithUserAndAccommodation,
} from "../actions"
import { Button } from "@/components/ui/button"
import { Accommodation, Reservation, User } from "@prisma/client"
import LoadingSkeleton from "./loading-skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import UsersTable from "./tables/users"
import AccommodationsTable from "./tables/accommodations/accommodations"
import ReservationsTable from "./tables/reservations"
import { ArrowDownAZ, ArrowDownZA, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAdminFilterStore } from "@/stores/admin-filter"
import { Tab } from "./page"
import { useRouter } from "next/navigation"

export type ReservationTable = Reservation & {
  user: User
  accommodation: Accommodation
}

// Define a discriminated union type for the data state
type AdminData =
  | { type: "users"; data: User[] }
  | { type: "accommodations"; data: Accommodation[] }
  | { type: "reservations"; data: ReservationTable[] }

export function Admin({ tab }: { tab: Tab }) {
  const { activeSection, setSort, sort, search, setSearch, setActiveSection } =
    useAdminFilterStore()
  const router = useRouter()

  const [data, setData] = useState<AdminData>({ type: tab, data: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setActiveSection(tab)
  }, [tab])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (activeSection === "users") {
          const users = await getUsers()
          setData({ type: "users", data: users })
        } else if (activeSection === "accommodations") {
          const accommodations = await getAccommodations()
          setData({ type: "accommodations", data: accommodations })
        } else if (activeSection === "reservations") {
          const reservations = await getReservationsWithUserAndAccommodation()
          setData({ type: "reservations", data: reservations })
        }
      } catch (error) {
        console.error(`Error fetching ${activeSection}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeSection])

  return (
    <div>
      {/* Section Buttons */}
      <div className="flex gap-2 justify-between flex-col md:flex-row">
        <div className="flex items-center order-2 md:order-1">
          <Button
            type="button"
            variant={activeSection === "users" ? "secondary" : "default"}
            onClick={() => router.push("/admin?tab=users")}
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
            onClick={() => router.push("/admin?tab=accommodations")}
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
            onClick={() => router.push("/admin?tab=reservations")}
            className={cn(
              "h-8 rounded-xl px-3 text-xs md:text-sm md:h-9 md:px-4 md:py-2 rounded-tl-none rounded-bl-none rounded-br-none bg-white",
              activeSection !== "reservations" &&
                "bg-amber-900 hover:bg-amber-950",
              activeSection === "reservations" && "hover:bg-white"
            )}
          >
            Reservations
          </Button>
        </div>

        <div className="-translate-y-3 flex items-center gap-2 w-full max-w-[700px] order-1 md:order-2">
          <Button
            type="button"
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white"
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          >
            Sort {sort === "asc" ? <ArrowDownZA /> : <ArrowDownAZ />}
          </Button>
          <div className="flex items-center  bg-white rounded-md pl-3 focus-within:ring-gray-400 focus-within:ring-2 w-full">
            <Search className="text-black/50" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeSection}`}
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
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {data.type === "users" && <UsersTable users={data.data} />}
                {data.type === "accommodations" && (
                  <AccommodationsTable accommodations={data.data} />
                )}
                {data.type === "reservations" && (
                  <ReservationsTable reservations={data.data} />
                )}
              </>
            )}
          </div>
        </ScrollArea>
        {activeSection === "accommodations" && (
          <Button
            type="button"
            className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus /> Add accommodation
          </Button>
        )}
      </div>
    </div>
  )
}
