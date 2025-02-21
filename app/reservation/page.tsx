import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import CalendarSelection from "./calendar-selection"
import { CircleCheck, CirclePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

const amenities = [
  "Free parking",
  "Basic kitchenwares",
  "Air conditioning",
  "Blanket and pillow",
  "Pet friendly",
  "Dining area",
  "Karaoke",
  "Billiards",
]

const inputFields = [
  { id: "firstName", label: "First name", type: "text", required: true },
  { id: "lastName", label: "Last name", type: "text", required: true },
  {
    id: "address",
    label: "Address",
    type: "text",
    required: true,
    colSpan: true,
  },
  { id: "email", label: "Email", type: "email", colSpan: true },
  { id: "birthday", label: "Birthday", type: "date" },
  { id: "contactNumber", label: "Contact number", type: "tel" },
]

export default function page() {
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
        <div className="mb-16 bg-amber-900 p-6 md:p-10 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl flex flex-col gap-12 md:gap-16">
          <h1 className="font-extrabold tracking-tight text-center text-3xl md:text-4xl">
            RESERVATION
          </h1>

          {/* calendar */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
            <div>
              <p>Check in</p>
              <CalendarSelection className="w-full md:w-72" />
            </div>
            <div>
              <p>Check Out</p>
              <CalendarSelection className="w-full md:w-72" />
            </div>
          </div>

          <div>
            <h2 className="mb-2 font-bold text-lg md:text-xl">
              Selected Accommodation: Cozy House Cottage
            </h2>
            <button
              type="button"
              className="w-full h-[300px] rounded-3xl overflow-hidden"
            >
              <Image
                width={1014}
                height={258}
                src={"/reservation/img1.png"}
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
              {amenities.map((amenity, index) => (
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
                    {field.required && <span className="text-red-600">*</span>}
                  </label>
                  <Input
                    type={field.type}
                    id={field.id}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                    className="bg-white text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 md:mb-6 font-bold text-xl md:text-2xl text-center">
              Guest Information
            </h2>

            <div className="bg-amber-950 p-6 md:p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className="mb-1">
                  Name
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name..."
                  className="bg-white text-black"
                />
              </div>
              <div>
                <label htmlFor="birthday" className="mb-1">
                  Birthday
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="birthday"
                  placeholder="Enter birthday..."
                  className="bg-white text-black"
                />
              </div>
              <div>
                <label htmlFor="gender" className="mb-1">
                  Gender
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  id="gender"
                  placeholder="Enter gender..."
                  className="bg-white text-black"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="healthIssues" className="">
                  Health Issues
                </label>
                <select
                  name="healthIssues"
                  id="healthIssues"
                  className="text-black rounded-lg h-9 px-2 text-base"
                >
                  <option value="none">None</option>
                  <option value="allergies">Allergies</option>
                  <option value="asthma">Asthma</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </div>
          <Button
            type="button"
            className="flex items-center gap-2 w-fit mx-auto bg-amber-400 hover:bg-amber-500 text-black"
            size={"lg"}
          >
            Add more <CirclePlus className="text-white/75" />
          </Button>

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
      </section>
      <Footer />
    </main>
  )
}
