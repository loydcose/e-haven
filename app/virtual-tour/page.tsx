import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const clips = [
  {
    id: 1,
    name: "Nipa Hut Cottage",
    image: "/virtual-tour/img2.png",
    link: "/virtual-tour",
  },
  {
    id: 2,
    name: "Nipa Hut Room Cottage",
    image: "/virtual-tour/img3.png",
    link: "/virtual-tour",
  },
  {
    id: 3,
    name: "Overlooking Hut Cottage",
    image: "/virtual-tour/img4.png",
    link: "/virtual-tour",
  },
  {
    id: 4,
    name: "Cozy House Cottage",
    image: "/virtual-tour/img5.png",
    link: "/virtual-tour",
  },
  {
    id: 5,
    name: "Family House Nipa Cottage",
    image: "/virtual-tour/img6.png",
    link: "/virtual-tour",
  },
]

export default function page() {
  return (
    <main>
      <section className="relative h-screen flex flex-col">
        <div className="bg-black/20 absolute inset-0 -z-10"></div>
        <div className="size-full absolute inset-0 -z-20">
          <Image
            src="/virtual-tour/header.png"
            alt="header background image"
            width={1737}
            height={841}
            className="size-full object-cover object-top"
          />
        </div>
        <div className="text-white mx-auto w-11/12 z-10 flex flex-col">
          <NavBar />
          <h1 className="uppercase mt-12 md:mt-16 font-bold text-4xl md:text-6xl text-center">
            Welcome to <br />
            Virtual Tour
          </h1>
        </div>
        <div className="bg-black/50 mt-auto italic leading-5">
          <p className="text-sm md:text-base text-white opacity-80 py-6 pl-[5%] pr-[5%]">
            Immerse yourself in the elegance and serenity of Nature’s Haven
            Resort with E-HAVEN, an interactive platform designed to elevate
            your experience. This virtual tour invites you to explore the
            resort’s breathtaking landscapes, luxurious amenities, and tranquil
            atmosphere, all at your convenience. From seamless navigation to
            effortless reservations, E-HAVEN combines sophistication and
            functionality, ensuring that every aspect of your journey is as
            remarkable as the destination itself. Begin your adventure with us
            and discover the perfect escape in the heart of Antipolo City.
          </p>
        </div>
      </section>
      <section className="bg-amber-100 py-16 md:py-20">
        <div className="mx-auto w-11/12">
          <div className="md:w-[75%] mx-auto text-3xl md:text-4xl mb-8 md:mb-12">
            <Image
              src="/virtual-tour/img1.png"
              alt="virtual-tour image 1"
              width={1278}
              height={427}
              className="size-full object-cover"
            />
          </div>
          <h2 className="font-bold text-center text-3xl md:text-4xl mb-8 md:mb-12 tracking-tight">
            NATURE&apos;S HAVEN RESORT VIDEO CLIPS
          </h2>
          <ul className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {clips.map((clip) => (
              <li key={clip.id}>
                <div className="aspect-square mb-3">
                  <Image
                    src={clip.image}
                    alt={`${clip.name}'s image`}
                    width={400}
                    height={400}
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <p className="font-medium">{clip.name}</p>
                  <Link
                    href={clip.link}
                    className={`${buttonVariants({
                      variant: "outline",
                    })} font-bold underline`}
                  >
                    View 360
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </main>
  )
}
