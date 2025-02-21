import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const rubikSans = Rubik({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nature's Haven Resort",
  description: "Your serene escape nestled deep within a pristine forest.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rubikSans.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
