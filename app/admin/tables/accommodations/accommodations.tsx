import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminFilterStore } from "@/stores/admin-filter"
import type { Accommodation } from "@prisma/client"
import { useEffect, useState } from "react"
import { AccommodationsAction } from "./accommodations-action"

// Accommodations Table Component
export default function AccommodationsTable({
  accommodations,
}: {
  accommodations: Accommodation[]
}) {
  const [filteredAccommodations, setFilteredAccommodations] =
    useState<Accommodation[]>(accommodations)
  const { search, sort, activeSection } = useAdminFilterStore()

  useEffect(() => {
    if (activeSection !== "accommodations") return

    let updatedAccommodations = [...accommodations]

    // Filter by search
    if (search) {
      updatedAccommodations = updatedAccommodations.filter(
        (accommodation) =>
          accommodation.title.toLowerCase().includes(search.toLowerCase()) ||
          accommodation.description
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          accommodation.amenities.some((amenity) =>
            amenity.toLowerCase().includes(search.toLowerCase())
          )
      )
    }

    // Sort by Title (or any other field)
    if (sort === "asc") {
      updatedAccommodations.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === "desc") {
      updatedAccommodations.sort((a, b) => b.title.localeCompare(a.title))
    }

    setFilteredAccommodations(updatedAccommodations)
  }, [activeSection, search, sort, accommodations])

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Title</TableHead>
          <TableHead className="text-black">Description</TableHead>
          <TableHead className="text-black">Price</TableHead>
          <TableHead className="text-black">Amenities</TableHead>
          <TableHead className="text-black">Created At</TableHead>
          <TableHead className="text-black">Last Updated</TableHead>
          <TableHead className="text-black">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAccommodations.map((accommodation) => (
          <TableRow key={accommodation.id}>
            <TableCell>{accommodation.id}</TableCell>
            <TableCell>{accommodation.title}</TableCell>
            <TableCell>{accommodation.description || "N/A"}</TableCell>
            <TableCell>{accommodation.price} Php</TableCell>
            <TableCell>
              {accommodation.amenities.join(", ") || "None"}
            </TableCell>
            <TableCell>
              {new Date(accommodation.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(accommodation.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <AccommodationsAction accommodation={accommodation} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
