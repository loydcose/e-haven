import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth/next"

// !BUCK UP IF NEED GOOGLE AUTH

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

