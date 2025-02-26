"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

// Define the schema for form validation using zod
const schema = z.object({
  date: z.date().optional(),
})

export default function CalendarSelection({
  className,
}: {
  className?: string
}) {
  const { control, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: undefined,
    },
  })

  const selectedDate = watch("date")

  React.useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate)
    }
  }, [selectedDate])

  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal bg-white hover:bg-gray-200 text-black",
                className
                // !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn(className)} align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
              className={className}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
