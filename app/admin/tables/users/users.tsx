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
import { DeleteUser } from "./delete-user"

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
          user.username.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort by username
    if (sort === "asc") {
      updatedUsers.sort((a, b) => a.username.localeCompare(b.username))
    } else if (sort === "desc") {
      updatedUsers.sort((a, b) => b.username.localeCompare(a.username))
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
          <TableHead className="text-black">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          filteredUsers.map((user) => (
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
              <TableCell>
                <DeleteUser userId={user.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
