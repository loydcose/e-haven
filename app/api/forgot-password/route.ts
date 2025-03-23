import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { Resend } from "resend"
import { EmailTemplate } from "@/app/forgot-password/email-template"
import { getUserByEmail, updateUser } from "@/app/actions"
import { Redis } from "@upstash/redis"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const resend = new Resend(process.env.RESEND_API_KEY)

// Set up Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

// Token expiration settings
const tokenExpiration = { expiresIn: "5m", label: "5 minutes" }
const RATE_LIMIT_WINDOW = 5 * 60 // 5 minutes in seconds

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    console.log(email)

    // Rate limiting check
    const rateLimitKey = `forgot-password:${email}`
    const lastRequest = await redis.get(rateLimitKey)

    if (
      lastRequest &&
      Date.now() - Number(lastRequest) < RATE_LIMIT_WINDOW * 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Email already sent, kindly wait ${tokenExpiration.label} before trying again.`,
        },
        { status: 200 }
      )
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not found!",
        status: 200,
      })
    }

    const now = new Date()
    const nowUnix = Math.floor(now.getTime() / 1000) // Convert Date to UNIX timestamp

    const updateResult = await updateUser(user.id, { lastPasswordReset: now })

    // Check if the update was unsuccessful
    if (!updateResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: updateResult.message || "Failed to update user",
        },
        { status: 400 }
      )
    }

    const token = await new SignJWT({ userId: user.id, iat: nowUnix })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(tokenExpiration.expiresIn)
      .sign(SECRET)

    const resetLink = `${process.env.PUBLIC_URL}/reset-password?token=${token}`

    const emailRes = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email.trim(),
      subject: "Reset Your Password",
      react: EmailTemplate({
        resetLink,
        tokenExpiration: tokenExpiration.label,
      }),
    })

    console.log(emailRes)
    if (!emailRes.data) {
      throw new Error(emailRes?.error?.message || "Failed to send email")
    }

    // Update Redis with the new request time
    await redis.set(rateLimitKey, Date.now(), { ex: RATE_LIMIT_WINDOW })

    return NextResponse.json(
      { success: true, message: "Reset link sent!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in forgot-password route:", error)
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    )
  }
}
