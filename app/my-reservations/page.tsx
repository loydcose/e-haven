import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

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
          <h3 className="font-extrabold tracking-tight text-lg md:text-xl mb-4">
            Active Reservation:{" "}
            <span className="font-normal">Nipa Hut Cottage</span>
          </h3>
          <div className="rounded-xl overflow-hidden mb-6 md:mb-10">
            <Image
              src="/my-reservations/img1.png"
              alt="img 1"
              width={1278}
              height={384}
              className="size-full object-cover"
            />
          </div>
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 w-fit mx-auto"
            size={"lg"}
          >
            View reservation
          </Button>
          <hr className="my-6 md:my-8" />
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
            History
          </h2>
          <h3 className="font-extrabold tracking-tight text-lg md:text-xl mb-4">
            August 3, 2024:{" "}
            <span className="font-normal">Nipa Hut Room Cottage</span>
          </h3>
          <div className="rounded-xl overflow-hidden mb-6 md:mb-10">
            <Image
              src="/my-reservations/img2.png"
              alt="img 1"
              width={1278}
              height={384}
              className="size-full object-cover"
            />
          </div>
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700 w-fit mx-auto"
            size={"lg"}
          >
            View details
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
