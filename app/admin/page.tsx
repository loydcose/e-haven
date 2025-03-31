import Image from "next/image"
import React from "react"
import Footer from "@/components/footer"
import AdminNavbar from "@/components/admin-nav-bar"
import { Admin } from "./admin"


export type Tab = "users" | "accommodations" | "reservations"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const tab = (await searchParams)?.tab || "users"

  return (
    <main className="relative">
      <div className="bg-black/20 absolute inset-0 -z-10"></div>
      <div className="size-full absolute inset-0 -z-20">
        <Image
          src="/admin/background.png"
          alt="reservation background image"
          width={1736}
          height={2626}
          className="size-full object-cover object-top"
        />
      </div>
      <section className="mx-auto w-11/12 z-10">
        <AdminNavbar />
        <h1 className="text-white font-extrabold tracking-tight text-center text-3xl md:text-4xl mb-6 md:mb-12">
          ADMIN DASHBOARD
        </h1>
        <div className="mb-16 text-white mx-auto rounded-xl flex flex-col">
          <Admin tab={tab as Tab}/>
        </div>
      </section>
      <Footer />
    </main>
  )
}
