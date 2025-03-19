import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/utils"
import { getUserById, updateUser } from "@/app/actions"

export async function POST(req: Request) {
  const { token, newPassword } = await req.json()

  console.log(token)
  return NextResponse.json({ message: "Password changed successfully!" })

  // try {
  //   const payload = await verifyToken(token)
  //   if (!payload) {
  //     return NextResponse.json(
  //       { message: "Invalid or expired token" },
  //       { status: 400 }
  //     )
  //   }

  //   const user = await getUserById(payload.userId)
  //   if (!user)
  //     return NextResponse.json({ message: "User not found" }, { status: 404 })

  //   // Validate token timestamp
  //   if (payload.iat < user.lastPasswordReset) {
  //     return NextResponse.json(
  //       { message: "Reset link expired!" },
  //       { status: 400 }
  //     )
  //   }

  //   // Update password & lastPasswordReset
  //   await updateUser(user.id, {
  //     password: newPassword,
  //     lastPasswordReset: Math.floor(Date.now() / 1000),
  //   })

  //   return NextResponse.json({ message: "Password changed successfully!" })
  // } catch {
  //   return NextResponse.json(
  //     { message: "Invalid or expired token" },
  //     { status: 400 }
  //   )
  // }
}
