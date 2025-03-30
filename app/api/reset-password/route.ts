import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/utils"
import { getUserById, updateUser } from "@/app/actions"
import bcrypt from "bcryptjs"
import * as Sentry from "@sentry/nextjs"

export async function POST(req: Request) {
  const { token, password: newPassword } = await req.json()

  try {
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      )
    }

    const user = await getUserById(payload.userId as string)
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )

    // Update password & lastPasswordReset
    const res = await updateUser(user.id, {
      password: await bcrypt.hash(newPassword, 10),
      lastPasswordReset: new Date(),
    })
    if (!res.success) {
      return NextResponse.json(
        { success: false, message: "Server error, please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully!",
    })
  } catch (error) {
    Sentry.captureException(error)

    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 400 }
    )
  }
}
