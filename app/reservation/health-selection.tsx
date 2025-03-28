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
import { healthIssues, HealthLabel } from "@/lib/utils" // Import the healthIssues array

export function HealthSelection({
  selectedHealthIssue,
  setSelectedHealthIssue,
}: {
  selectedHealthIssue: HealthLabel | null
  setSelectedHealthIssue: (healthIssue: HealthLabel) => void
}) {
  return (
    <div>
      <p>
        Health issues<span className="text-red-600">*</span>
      </p>
      <Select
        value={selectedHealthIssue || undefined}
        onValueChange={(value) => setSelectedHealthIssue(value as HealthLabel)}
      >
        <SelectTrigger className="text-black bg-white">
          <SelectValue
            placeholder="Select health issues"
            className="text-black bg-white"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select health issues</SelectLabel>
            {healthIssues.map((issue) => (
              <SelectItem key={issue.value} value={issue.value}>
                {issue.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
