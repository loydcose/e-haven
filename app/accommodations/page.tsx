import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import { buttonVariants } from "@/components/ui/button"
import { Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { getAccommodations } from "../actions"

export default async function page() {
  const accommodations = await getAccommodations()
  return (
    <main className="relative">
      <div className="bg-amber-800 absolute inset-0 -z-10"></div>
      
      <div className="mx-auto w-11/12 z-10 mb-16 md:mb-20">
        <NavBar />
        <div className="bg-black/60 p-10 md:p-16 text-white max-w-[1150px] mx-auto">
          <h1 className="font-extrabold tracking-tight text-center text-4xl md:text-5xl mb-12 md:mb-20">
            Experience The Nature Of Beauty
          </h1>

          <ul className="flex flex-col gap-16 md:gap-20">
            {accommodations.map((accom, index) => (
              <li
                key={accom.id}
                className="flex flex-col md:flex-row gap-4 md:gap-12"
              >
                <div
                  className={`aspect-square grow shrink-0 w-full max-w-[350px] ${
                    index % 2 === 0 ? "order-1" : "order-1 md:order-2"
                  }`}
                >
                  <Image
                    src={accom.image}
                    alt={`${accom.title}'s image`}
                    width={400}
                    height={400}
                    className="size-full object-cover"
                  />
                </div>

                <div
                  className={`${
                    index % 2 === 0 ? "order-1 md:order-2" : "order-1"
                  }`}
                >
                  <h2 className="mb-2 md:mb-4 font-bold text-2xl md:text-3xl tracking-tight">
                    {accom.title}
                  </h2>
                  <p className="mb-6 md:mb-12">{accom.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag />
                    <span className="font-bold text-lg md:text-xl">
                      PHP {accom.price}
                    </span>
                  </div>
                  <Link
                    href={`/reservation/${accom.slug}`}
                    className={`${buttonVariants({
                      variant: "secondary",
                      size: "lg",
                    })}`}
                  >
                    BOOK NOW
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  )
}
