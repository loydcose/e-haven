import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import GuestInformation from "../guest-information"
import { getAccommodation, getUserById, getUserFromToken } from "@/app/actions"
import { CalendarSelection } from "../calendar-selection"
import CustomerInformation from "../customer-information"
import SubmitButton from "../submit-btn"
import AgreementCheck from "../agreement-check"
import { JwtPayload } from "jsonwebtoken"

// TODO: add skeleton laoder using nextjs streaming

export const revalidate = 300

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const accommodation = await getAccommodation(slug)

  const payload: JwtPayload | null = await getUserFromToken()
  if (!payload || !payload.id) throw new Error("Unauthorized!")
  const user = await getUserById(payload.id)

  if (!user) throw new Error("Unauthorized!")

  return (
    <main className="relative">
      <div className="bg-black/20 absolute inset-0 -z-10"></div>
      <div className="size-full absolute inset-0 -z-20">
        <Image
          src="/reservation/background.png"
          alt="reservation background image"
          width={1736}
          height={2626}
          className="size-full object-cover object-top"
        />
      </div>
      <section className="mx-auto w-11/12 z-10">
        <NavBar />
        <div className="mb-16 bg-amber-900 p-6 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl">
          {accommodation ? (
            <div className="flex flex-col gap-12 md:gap-16">
              <h1 className="font-extrabold tracking-tight text-center text-3xl md:text-4xl">
                RESERVATION
              </h1>

              <div>
                <p className="mb-2">Check in - Check out</p>
                <CalendarSelection
                  className="w-full md:w-72"
                  accommodationId={accommodation.id}
                />
              </div>

              <div>
                <h2 className="mb-2 font-bold text-lg md:text-xl">
                  Selected Accommodation: {accommodation.title}
                </h2>
                <button
                  type="button"
                  className="w-full h-[300px] rounded-3xl overflow-hidden"
                >
                  <Image
                    width={1014}
                    height={258}
                    src={accommodation.image}
                    alt="selected reservation image"
                    className="size-full object-cover"
                  />
                </button>
              </div>

              <div>
                <h2 className="mb-2 font-bold text-lg md:text-xl">
                  Amenities Included
                </h2>
                <ul className="bg-amber-950 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 rounded-xl">
                  {accommodation.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CircleCheck className="text-green-600" />{" "}
                      <span>{amenity}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <CircleCheck className="text-green-600" />{" "}
                    <span>Up to {accommodation.maxCapacity} PAX</span>
                  </li>
                </ul>
              </div>

              <CustomerInformation user={user} />

              <GuestInformation maxCapacity={accommodation.maxCapacity} />

              <div>
                <div className="mb-4 w-fit mx-auto">
                  <AgreementCheck />
                </div>
                <div className="flex items-center gap-2 w-fit mx-auto">
                  <Button
                    type="button"
                    size={"lg"}
                    className="text-white bg-gray-500 hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                  <SubmitButton
                    accommodation={accommodation}
                    userId={user.id}
                  />
                </div>
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold md:text-2xl">
              {slug} accommodation not found
            </h2>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
