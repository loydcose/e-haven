import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React, { Suspense } from "react"
import Footer from "@/components/footer"
import MyReservations from "./my-reservations"
import { Skeleton } from "@/components/ui/skeleton"

export default function page() {
  return (
    <main className="relative">
      <div className="bg-black/20 absolute inset-0 -z-10"></div>
      <div className="size-full absolute inset-0 -z-20">
        <Image
          src="/my-reservations/background.png"
          alt="reservation background image"
          width={1736}
          height={2626}
          className="size-full object-cover object-top"
        />
      </div>
      <section className="mx-auto w-11/12 z-10">
        <NavBar />
        <h1 className="font-extrabold tracking-tight text-center text-3xl md:text-4xl text-white mb-6 md:mb-12">
          My Reservations
        </h1>
        <div className="mb-16 bg-amber-900 p-6 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl flex flex-col">
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-full h-56 bg-amber-800 mb-6 md:mb-10" />
                <Skeleton className="w-full h-56 bg-amber-800" />
              </div>
            }
          >
            <MyReservations />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  )
}
