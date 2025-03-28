import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { Resend } from "resend"
import { getUserByEmail } from "@/app/actions"
import { EmailTemplate } from "@/app/my-account/email-template"
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
const RATE_LIMIT_WINDOW = 5 * 60 // 15 minutes in seconds

export async function POST(req: Request) {
  console.log("went here")
  try {
    const { email } = await req.json()
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not found!",
        status: 200,
      })
    }

    console.log("went here 2")

    if (user.isEmailVerified) {
      return NextResponse.json({
        success: false,
        message: "Email is already verified!",
        status: 200,  
      })
    }
    console.log("went here 3")

    // Rate limiting check
    const rateLimitKey = `verify-email:${user.id}`
    const lastRequest = await redis.get(rateLimitKey)

    console.log({
      rateLimited:
        lastRequest &&
        Date.now() - Number(lastRequest) < RATE_LIMIT_WINDOW * 1000,
    })

    if (
      lastRequest &&
      Date.now() - Number(lastRequest) < RATE_LIMIT_WINDOW * 1000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification email already sent. Please wait 15 minutes before requesting again.",
        },
        { status: 200 }
      )
    }

    // Update Redis with the new request time
    await redis.set(rateLimitKey, Date.now(), { ex: RATE_LIMIT_WINDOW })

    // Generate a verification token
    const now = Math.floor(Date.now() / 1000)
    const token = await new SignJWT({ userId: user.id, iat: now })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(tokenExpiration.expiresIn)
      .sign(SECRET)

    // Construct the verification link
    const verificationLink = `${process.env.PUBLIC_URL}/email-verification?token=${token}`

    // Send the verification email
    const emailRes = await resend.emails.send({
      from: "E-Haven <no-reply@e-haven.live>",
      to: email.trim(),
      subject: "Verify Your Email Address",
      react: EmailTemplate({
        verificationLink,
        tokenExpiration: tokenExpiration.label,
      }),
    })

    console.log(emailRes)

    if (!emailRes.data) {
      throw new Error(emailRes?.error?.message || "Failed to send email")
    }

    return NextResponse.json(
      { success: true, message: "Verification email sent!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in verify-email route:", error)
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    )
  }
}
