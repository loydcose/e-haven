"use client"

import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"

export default function ProfileDropdown() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/log-out", {
      method: "POST",
    })
    router.push("/sign-in")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" size={"icon"} className="overflow-hidden">
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-fit" align="end">
        <div className="bg-white">
          <div className="flex md:hidden flex-col">
            <Link
              href="/"
              className={
                buttonVariants({ variant: "ghost" }) + " hover:bg-gray-200"
              }
            >
              Home
            </Link>
            <Link
              href="/accommodations"
              className={
                buttonVariants({ variant: "ghost" }) + " hover:bg-gray-200"
              }
            >
              Accommodation
            </Link>
            <Link
              href="/about-us"
              className={
                buttonVariants({ variant: "ghost" }) + " hover:bg-gray-200"
              }
            >
              About
            </Link>
            <Button type="button">Book now</Button>
            <hr className="my-4 " />
          </div>
          <h3 className="text-center mb-2 font-bold">Profile</h3>
          <div className="flex flex-col">
            <Link
              href="/my-account"
              className={
                buttonVariants({ variant: "ghost" }) + " hover:bg-gray-200"
              }
            >
              My Account
            </Link>
            <Link
              href="/my-reservations"
              className={
                buttonVariants({ variant: "ghost" }) + " hover:bg-gray-200"
              }
            >
              My Reservations
            </Link>
            <Button
              onClick={handleLogout}
              type="button"
              variant={"ghost"}
              className="text-red-600 hover:text-red hover:bg-gray-200"
            >
              Log out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
