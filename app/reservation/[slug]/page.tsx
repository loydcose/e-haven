import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import { CircleCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import GuestInformation from "../guest-information"
import { getAccommodation } from "@/app/actions"
import { CalendarSelection } from "../calendar-selection"

const inputFields = [
  {
    id: "firstName",
    label: "First name",
    type: "text",
    defaultValue: "Loyd",
    required: true,
  },
  {
    id: "lastName",
    label: "Last name",
    type: "text",
    defaultValue: "Cose",
    required: true,
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    required: true,
    colSpan: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    defaultValue: "loydcose@gmail.com",
    colSpan: true,
    required: true,
  },
  { id: "birthday", label: "Birthday", type: "date", required: true },
  { id: "contactNumber", label: "Contact number", type: "tel", required: true },
]

// TODO: add skeleton laoder using nextjs streaming

export default async function page({ params }: { params: { slug: string } }) {
  const accommodation = await getAccommodation(params.slug)
  console.log(accommodation?.image)

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
                <CalendarSelection className="w-full md:w-72" />
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
                </ul>
              </div>

              <div>
                <h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-center">
                  Customer Information
                </h2>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  {inputFields.map((field) => (
                    <div
                      key={field.id}
                      className={field.colSpan ? "md:col-span-2" : ""}
                    >
                      <label htmlFor={field.id} className="mb-1">
                        {field.label}
                        {field.required && (
                          <span className="text-red-600">*</span>
                        )}
                      </label>
                      <Input
                        type={field.type}
                        id={field.id}
                        placeholder={`Enter your ${field.label.toLowerCase()}...`}
                        defaultValue={field.defaultValue || ""}
                        className="bg-white text-black"
                        required={field.required}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <GuestInformation />

              <div className="flex items-center gap-2 w-fit mx-auto">
                <Button
                  type="button"
                  size={"lg"}
                  className="text-white bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size={"lg"}
                  className="text-white bg-green-600 hover:bg-green-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold md:text-2xl">
              {params.slug} accommodation not found
            </h2>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
