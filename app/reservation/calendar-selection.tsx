"use client"

import {
  format,
  startOfDay,
  isWithinInterval,
  isAfter,
  isBefore,
} from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useReservationStore } from "@/stores/reservation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

const bookedDates = [
  {
    from: new Date("2025-03-24"),
    to: new Date("2025-03-25"),
  },
  {
    from: new Date("2025-03-28"),
    to: new Date("2025-03-30"),
  },
]

export function CalendarSelection({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const { setCheckIn, setCheckOut } = useReservationStore()
  const { toast } = useToast()

  useEffect(() => {
    if (date?.from && date?.to) {
      setCheckIn(date.from)
      setCheckOut(date.to)
    }
  }, [date?.from, date?.to, setCheckIn, setCheckOut])

  // Function to check if a selected range overlaps with booked dates
  const isRangeValid = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return true // If range is incomplete, allow selection

    const normalizedFrom = startOfDay(range.from)
    const normalizedTo = startOfDay(range.to)

    return !bookedDates.some((bookedRange) => {
      const bookedFrom = startOfDay(bookedRange.from)
      const bookedTo = startOfDay(bookedRange.to)

      // Check if the selected range overlaps with any booked range
      return (
        isWithinInterval(normalizedFrom, {
          start: bookedFrom,
          end: bookedTo,
        }) ||
        isWithinInterval(normalizedTo, { start: bookedFrom, end: bookedTo }) ||
        (isBefore(normalizedFrom, bookedFrom) &&
          isAfter(normalizedTo, bookedTo))
      )
    })
  }

  // Handle date selection
  const handleDateSelect = (selected: DateRange | undefined) => {
    if (isRangeValid(selected)) {
      setDate(selected) // Update the date if the range is valid
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Range",
        description:
          "The selected range includes booked dates. Please choose another range.",
      })
    }
  }

  // Define custom modifiers for past and booked dates
  const modifiers = {
    past: (date: Date) => startOfDay(date) < startOfDay(new Date()), // Past dates
    booked: (date: Date) =>
      bookedDates.some((range) =>
        isWithinInterval(startOfDay(date), {
          start: startOfDay(range.from),
          end: startOfDay(range.to),
        })
      ),
  }

  // Define custom styles for modifiers
  const modifiersClassNames = {
    past: "text-gray-500",
    booked: "bg-red-600 text-white",
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal text-black",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect} // Use the custom handler
            numberOfMonths={2}
            modifiers={modifiers} // Pass custom modifiers
            modifiersClassNames={modifiersClassNames} // Pass custom styles for modifiers
            disabled={(date) => {
              // Disable past dates and booked dates
              return (
                modifiers.past(date) || modifiers.booked(date) // Use the same logic as modifiers
              )
            }}
          />
          <div className="flex items-center gap-4 text-sm px-3 pb-4 text-gray-700">
            <p className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded-full bg-gray-400"></span> Past
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded-full bg-black"></span>{" "}
              Available
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded-full bg-red-500"></span> Booked
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
