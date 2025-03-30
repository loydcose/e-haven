import { SignJWT } from "jose"
import { serialize } from "cookie"
import * as Sentry from "@sentry/nextjs";


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    if (username !== adminUsername) {
      return new Response(
        JSON.stringify({ message: "Username doesn't exist", success: false }),
        {
          status: 200,
        }
      )
    }

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ message: "Password incorrect", success: false }),
        {
          status: 200,
        }
      )
    }

    // Generate JWT with "jose"
    const token = await new SignJWT({ username: adminUsername })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2d")
      .sign(JWT_SECRET)

    const cookie = serialize("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })

    return new Response(
      JSON.stringify({ message: "Login successful", success: true }),
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    )
  } catch(error) {
    Sentry.captureException(error)
    return new Response(
      JSON.stringify({ message: "Server error", success: false }),
      {
        status: 401,
      }
    )
  }
}
