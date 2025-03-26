import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"

const services = [
  {
    id: 1,
    title: "WELCOME TO",
    describe:
      "Nature's Haven Resort! Located on the tranquil Binayoyo-Calawis Rd. in Antipolo, Philippines, Nature's Haven Resort is your ultimate destination for relaxation and a reconnection with nature. Surrounded by lush greenery and scenic landscapes, our resort offers a peaceful retreat for families, couples, and individuals looking to unwind and escape the hustle and bustle of everyday life.",
    image: "/about-us/about-us1.png",
  },
  {
    id: 2,
    title: "WHAT WE OFFER",
    describe:
      "At Nature's Haven Resort, we provide a serene escape from the hustle and bustle of everyday life. Our lush landscapes, cozy accommodations, and diverse activities ensure that every guest enjoys a peaceful and memorable stay. Whether you're here to relax by the pool, explore nature trails, or savor delicious local cuisine, we have something for everyone.",
    image: "/about-us/about-us2.png",
  },
  {
    id: 3,
    title: "WE SERVE",
    describe:
      "We are deeply committed to sustainability and eco-friendly practices. By integrating green initiatives into our resort operations, we strive to preserve the beauty of our natural surroundings and contribute to the local community. At Nature’s Haven, we believe in responsible tourism and ensuring a future where nature thrives.",
    image: "/about-us/about-us3.png",
  },
]

export default function page() {
  return (
    <main>
      <section className="h-screen">
        <div className="bg-black/20 absolute inset-0 -z-10"></div>
        <div className="size-full absolute inset-0 -z-20">
          <Image
            src="/about-us/about-us-header.png"
            alt="about us background image"
            width={1728}
            height={841}
            className="size-full object-cover object-top"
          />
        </div>
        <div className="mx-auto w-11/12 z-10 mb-16 md:mb-20 flex flex-col h-full">
          <NavBar />
          <div className="my-auto text-center text-white flex flex-col gap-1">
            <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight">
              ABOUT US
            </h1>
            <p className="font-bold text-lg">Welcome to</p>
            <h2 className="font-extrabold text-4xl md:text-6xl tracking-tight">
              Nature&apos;s Haven Resort
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-amber-100 py-16 md:py-20">
        <ul className="mx-auto w-11/12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {services.map((service) => (
            <li key={service.id} className="flex flex-col gap-4">
              <div className="aspect-square w-full">
                <Image
                  src={service.image}
                  alt={`${service.title}'s image`}
                  width={500}
                  height={500}
                  className="size-full object-cover"
                />
              </div>
              <h2 className="font-bold tracking-tight text-3xl md:text-4xl text-center">
                {service.title}
              </h2>
              <p>{service.describe}</p>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  )
}
