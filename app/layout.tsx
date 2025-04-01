import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getUserFromToken } from "./actions"
import { userSessionStore } from "@/stores/user-session"

const rubikSans = Rubik({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nature's Haven Resort",
  description: "Your serene escape nestled deep within a pristine forest.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getUserFromToken()

  // Set the initial value in the Zustand store
  userSessionStore.setState({ session: payload })

  return (
    <html lang="en">
      <body className={`${rubikSans.className} antialiased`}>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
