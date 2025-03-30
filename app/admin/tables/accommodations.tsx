import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Accommodation } from "@prisma/client"

// Accommodations Table Component
export default function AccommodationsTable({
  accommodations,
}: {
  accommodations: Accommodation[]
}) {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {accommodations.map((accommodation) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
