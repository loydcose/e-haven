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
import { useAccommodationFilterStore } from "@/stores/accommodation-filter"

export function BedsSelection() {
  const { noOfBed, setNoOfBed } = useAccommodationFilterStore()
  const [value, setValue] = React.useState<string>("")

  // Sync local state with store
  React.useEffect(() => {
    setValue(noOfBed === null ? "" : String(noOfBed))
  }, [noOfBed])

  const handleValueChange = (value: string) => {
    setValue(value)
    setNoOfBed(value === "" ? null : Number(value))
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] bg-stone-900 outline-none border-none">
        <SelectValue
          placeholder="No. of bed"
          className="text-white placeholder:text-white"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>No. of beds</SelectLabel>
          {[0, 1, 2, 3, 4, 5, 6].map((item) => (
            <SelectItem key={item} value={String(item)}>
              <div className="flex items-center gap-2">
                <Bed size={18} />{" "}
                <p>{item === 0 ? "No bed" : `${item}x bed`}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
