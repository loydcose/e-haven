"use client"

import React, { useEffect, useState } from "react"

import { getUsers, getAccommodations, getReservations } from "../actions"
import { Button } from "@/components/ui/button"
import { Accommodation, Reservation, User } from "@prisma/client"
import LoadingSkeleton from "./loading-skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import UsersTable from "./tables/users"
import AccommodationsTable from "./tables/accommodations"
import ReservationsTable from "./tables/reservations"

// Define a discriminated union type for the data state
type AdminData =
  | { type: "users"; data: User[] }
  | { type: "accommodations"; data: Accommodation[] }
  | { type: "reservations"; data: Reservation[] }

export function Admin() {
  const [activeSection, setActiveSection] = useState<
    "users" | "accommodations" | "reservations"
  >("users")
  const [data, setData] = useState<AdminData>({ type: "users", data: [] })
  const [loading, setLoading] = useState(true)

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
          const reservations = await getReservations()
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
      <div className="flex items-center">
        <Button
          type="button"
          variant={activeSection === "users" ? "secondary" : "default"}
          onClick={() => setActiveSection("users")}
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
          variant={activeSection === "accommodations" ? "secondary" : "default"}
          onClick={() => setActiveSection("accommodations")}
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
          onClick={() => setActiveSection("reservations")}
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
      </div>
    </div>
  )
}
