import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/utils"
import { getUserById } from "@/app/actions"
import * as Sentry from "@sentry/nextjs"

export async function POST(req: Request) {
  const { token } = await req.json()
  console.log({ tokenFromServer: token })

  try {
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 200 }
      )
    }

    const user = await getUserById(payload.userId as string)
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )

    if (
      payload.iat &&
      payload.iat <
        Math.floor(new Date(user.lastPasswordReset).getTime() / 1000)
    ) {
      return NextResponse.json(
        { success: false, message: "Reset link expired!" },
        { status: 200 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully!",
    })
  } catch(error) {
    Sentry.captureException(error)
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 400 }
    )
  }
}
