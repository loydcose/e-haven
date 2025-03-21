import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import { Resend } from "resend"
import { getUserByEmail } from "@/app/actions"
import { EmailTemplate } from "@/app/my-account/email-template"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const resend = new Resend(process.env.RESEND_API_KEY)

// Token expiration settings
const tokenExpiration = { expiresIn: "15m", label: "15 minutes" }

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    console.log(email)

    // Fetch the user by email
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email not found!",
        status: 200,
      })
    }

    console.log({isVerified: user.isEmailVerified})

    // Check if the email is already verified
    if (user.isEmailVerified) {
      return NextResponse.json({
        success: false,
        message: "Email is already verified!",
        status: 200,
      })
    }

    const now = new Date()
    const nowUnix = Math.floor(now.getTime() / 1000) // Convert Date to UNIX timestamp

    // Generate a verification token
    const token = await new SignJWT({ userId: user.id, iat: nowUnix })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(tokenExpiration.expiresIn)
      .sign(SECRET)

    // Construct the verification link
    const verificationLink = `${process.env.PUBLIC_URL}/email-verification?token=${token}`

    // Send the verification email
    const emailRes = await resend.emails.send({
      from: "onboarding@resend.dev",
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
