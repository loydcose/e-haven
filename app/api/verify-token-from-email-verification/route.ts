import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/utils"
import { getUserById, updateUser } from "@/app/actions"

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

    if (user.isEmailVerified)
      return NextResponse.json(
        { success: false, message: "Email already verified" },
        { status: 200 }
      )

    const updateRes = await updateUser(user.id, { isEmailVerified: true })
    if (!updateRes.success) {
      return NextResponse.json(
        {
          success: false,
          message: updateRes.message || "Server error, please try again later.",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Email verified successfully!",
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 400 }
    )
  }
}
