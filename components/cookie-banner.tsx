"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { getUserById, getUserFromToken, updateUser } from "@/app/actions"
import { X } from "lucide-react"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false) // State to control banner visibility
  const [fadeClass, setFadeClass] = useState("opacity-0") // State to control fade-in and fade-out classes
  const [userId, setUserId] = useState<string | null>(null) // State to store the user ID

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const payload = await getUserFromToken()
      if (!payload) return

      const user = await getUserById(payload.id as string)
      if (user && !user.hasShownCookieMsg) {
        setShowBanner(true) // Show the banner if `hasShownCookieMsg` is false
        setTimeout(() => setFadeClass("opacity-100"), 50) // Trigger fade-in effect
        setUserId(user.id as string) // Store the user ID
      }
    }

    fetchUser()
  }, [])

  // Handle "Continue" button click
  const handleContinue = async () => {
    if (!userId) return

    const result = await updateUser(userId, { hasShownCookieMsg: true })
    if (result.success) {
      setFadeClass("opacity-0") // Trigger fade-out effect
      setTimeout(() => setShowBanner(false), 300) // Remove banner after fade-out
    } else {
      console.error("Failed to update user:", result.message)
    }
  }

  if (!showBanner) return null // Don't render the banner if it shouldn't be shown

  return (
    <div
      className={`fixed bottom-10 left-0 right-0 w-[90%] mx-auto max-w-3xl bg-amber-900 text-white rounded-2xl p-4 md:p-6 shadow-xl transition-opacity duration-300 ${fadeClass}`}
    >
      <div className="flex items-center gap-2 mb-4 relative">
        <div className="md:size-[50px] size-[35px]">
          <Image
            src="/cookie.svg"
            alt="cookie"
            width={50}
            height={50}
            className="w-full object-cover"
          />
        </div>
        <h4 className="text-lg md:text-xl font-bold">Cookie Notice</h4>
        <Button
          type="button"
          className="absolute top-[-10] right-[-10] flex rounded-full"
          variant={"ghost"}
          size={"icon"}
          onClick={() => setShowBanner(false)}
        >
          <X className="m-auto" />
        </Button>
      </div>
      <div className="flex items-start gap-4">
        <p className="mb-4 text-sm">
          This site uses cookies to keep your session active and ensure a secure
          experience. Learn more in our{" "}
          <Link
            href="/privacy-policy"
            className="hover:underline font-bold text-amber-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          type="button"
          variant={"secondary"}
          size={"sm"}
          className="ml-auto block"
          onClick={handleContinue} // Call the handler on click
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
