"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function AdminNavbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/log-out", {
      method: "POST",
    })
    router.push("/admin/sign-in")
  }

  return (
    <nav className="flex items-center justify-between gap-4 py-6">
      <div className="w-[289px] md:w-[389px]">
        <Image
          src="/logo.png"
          alt="e-haven logo"
          width={389}
          height={81}
          className="object-cover size-full"
        />
      </div>
      <Button onClick={handleLogout} type="button">
        Log out
      </Button>
    </nav>
  )
}
