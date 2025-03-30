import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminFilterStore } from "@/stores/admin-filter"
import type { User } from "@prisma/client"
import { useEffect, useState } from "react"

// Users Table Component
export default function UsersTable({ users }: { users: User[] }) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const { search, sort, activeSection } = useAdminFilterStore()

  useEffect(() => {
    if (activeSection !== "users") return

    let updatedUsers = [...users]

    // Filter by search
    if (search) {
      updatedUsers = updatedUsers.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by ID (or any other field)
    if (sort === "asc") {
      updatedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
    } else if (sort === "desc") {
      updatedUsers.sort((a, b) => b.firstName.localeCompare(a.firstName))
    }

    setFilteredUsers(updatedUsers)
  }, [activeSection, search, sort, users])

  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Full Name</TableHead>
          <TableHead className="text-black">Username</TableHead>
          <TableHead className="text-black">Email</TableHead>
          <TableHead className="text-black">Verified verified</TableHead>
          <TableHead className="text-black">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isEmailVerified ? "Yes" : "No"}</TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
