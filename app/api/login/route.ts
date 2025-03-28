import { SignJWT } from "jose"
import { serialize } from "cookie"
import bcrypt from "bcryptjs" // Import bcrypt for password comparison
import db from "@/lib/db"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const user = await db.user.findUnique({
      where: { username: username },
    })
    console.log({ user })

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Username doesn't exist", success: false }),
        {
          status: 200,
        }
      )
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Password incorrect", success: false }),
        {
          status: 200,
        }
      )
    }

    // Generate JWT with "jose"
    const token = await new SignJWT({
      id: user.id,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2d")
      .sign(JWT_SECRET)

    const cookie = serialize("token", token, {
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
  } catch (error) {
    console.error("Error during login:", error)
    return new Response(
      JSON.stringify({ message: "Server error", success: false }),
      {
        status: 401,
      }
    )
  }
}
