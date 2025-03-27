import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bed } from "lucide-react"

export function BedsSelection() {
  const [selectedBed, setSelectedBed] = React.useState<string | null>(null)

  const handleValueChange = (value: string) => {
    setSelectedBed(value) // Update the state with the selected value
    console.log("Selected bed:", value) // Log the selected value (optional)
  }

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-stone-900 outline-none border-none">
        <SelectValue
          placeholder="No. of bed"
          className="text-white placeholder:text-white"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>No. of beds</SelectLabel>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SelectItem key={item} value={String(item)}>
              <div className="flex items-center gap-2">
                <Bed size={18}/> <p>{item}x bed</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
