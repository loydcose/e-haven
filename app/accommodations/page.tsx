import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import { buttonVariants } from "@/components/ui/button"
import { Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const accommodations = [
  {
    id: 1,
    name: "Nipa Hut Cottage",
    description:
      "Open-air cottage made with bamboo and anahaw leaves as a roofing surrounded by different kinds of beautiful trees",
    price: 300,
    link: "/accommodations",
    image: "/accommodations/accomm-image1.png",
  },
  {
    id: 2,
    name: "Nipa Hut Room Cottage",
    description:
      "Perfect place for relaxing. It has comfortable one double-sized beds and a warm, welcoming feel. Surrounded by nature, it's a great spot to unwind and enjoy a peaceful stay.",
    price: 300,
    link: "/accommodations",
    image: "/accommodations/accomm-image2.png",
  },
  {
    id: 3,
    name: "Overlooking Hut Cottage",
    description:
      "This cozy retreat invites you to unwind and connect with nature. Imagine sipping your morning coffee while soaking in the breathtaking landscape, Perfect for couples, families, or solo adventurers. Escape the everyday and create lasting memories in this enchanting hideaway!",
    price: 800,
    link: "/accommodations",
    image: "/accommodations/accomm-image3.png",
  },
  {
    id: 4,
    name: "Cozy Hut Cottage",
    description:
      "Cozy space built like a small house with a spacious interior. Room has Two (2) double decks accommodating Four persons. Ideal for families or friends looking to escape the hustle and bustle.",
    price: 1000,
    link: "/accommodations",
    image: "/accommodations/accomm-image4.png",
  },
  {
    id: 5,
    name: "Family House Nipa Cottage",
    description:
      "Comfortable place for family getaway. Fresh and natural cold air without needing a fan. This room can accommodate Ten (10) persons with larger room space, perfect for storing bags and other belongings",
    price: 1500,
    link: "/accommodations",
    image: "/accommodations/accomm-image5.png",
  },
]

export default function page() {
  return (
    <main className="relative">
      <div className="bg-black/20 absolute inset-0 -z-10"></div>
      <div className="size-full absolute inset-0 -z-20">
        <Image
          src="/accommodations/accommodations-image.png"
          alt="accommodations background image"
          width={1736}
          height={2626}
          className="size-full object-cover object-top"
        />
      </div>
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
                className="flex flex-col md:flex-row gap-4 md:gap-8 md:gap-12"
              >
                <div
                  className={`aspect-square grow shrink-0 w-full  max-w-[350px] ${
                    index % 2 === 0 ? "order-1" : "order-1 md:order-2"
                  }`}
                >
                  <Image
                    src={accom.image}
                    alt={`${accom.name}'s image`}
                    width={400}
                    height={400}
                    className="size-full object-cover"
                  />
                </div>

                <div
                  className={`${
                    index === 0 ? "order-1 md:order-2" : "order-1"
                  }`}
                >
                  <h2
                    className={`mb-2 md:mb-4 font-bold text-2xl md:text-3xl tracking-tight`}
                  >
                    {accom.name}
                  </h2>
                  <p className="mb-6 md:mb-12">{accom.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag />
                    <span className="font-bold text-lg md:text-xl">
                      PHP {accom.price}
                    </span>
                  </div>
                  <Link
                    href={accom.link}
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
