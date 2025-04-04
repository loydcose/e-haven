"use client"

import Image from "next/image"
import { buttonVariants } from "./ui/button"
import Link from "next/link"
import ProfileDropdown from "./profile-dropdown"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()
  const isBlackText = pathname === "/accommodations" || pathname === "/my-account"
  const textColor = isBlackText ? "text-black" : "text-white"

  return (
    <nav className="flex items-center justify-between gap-4 py-6">
      <Link href="/" className="block shrink-1">
        <div className="w-full max-w-[289px] md:max-w-[389px]">
          <Image
            src="/logo.png"
            alt="e-haven logo"
            width={389}
            height={81}
            className="object-cover size-full"
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <div className="md:flex hidden items-center gap-8">
          <div className={`flex items-center gap-6 font-bold ${textColor}`}>
            <Link className="drop-shadow-lg hover:underline" href="/">
              Home
            </Link>
            <Link className="drop-shadow-lg hover:underline" href="/accommodations">
              Accommodation
            </Link>
            <Link className="drop-shadow-lg hover:underline" href="/about-us">
              About
            </Link>
          </div>

          <Link
            href="/accommodations"
            className={buttonVariants({ variant: "default" })}
          >
            Book now
          </Link>
        </div>
        <ProfileDropdown />
      </div>
    </nav>
  )
}
