import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@prisma/client"

// Users Table Component
export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table className="overflow-x-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black">ID</TableHead>
          <TableHead className="text-black">Full Name</TableHead>
          <TableHead className="text-black">Username</TableHead>
          <TableHead className="text-black">Email</TableHead>
          <TableHead className="text-black">Verified</TableHead>
          <TableHead className="text-black">Password Reset</TableHead>
          <TableHead className="text-black">Last Updated</TableHead>
          <TableHead className="text-black">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.isEmailVerified ? "Yes" : "No"}</TableCell>
            <TableCell>
              {new Date(user.lastPasswordReset).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(user.updatedAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
