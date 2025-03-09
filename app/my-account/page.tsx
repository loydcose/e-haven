import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

export default function page() {
  return (
    <main className="relative">
      <div className="bg-black/20 absolute inset-0 -z-10"></div>
      <div className="size-full absolute inset-0 -z-20">
        <Image
          src="/my-account/background.png"
          alt="reservation background image"
          width={1736}
          height={2626}
          className="size-full object-cover object-top"
        />
      </div>
      <section className="mx-auto w-11/12 z-10">
        <NavBar />
        <div className="mb-16 bg-amber-900/75 p-10 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl">
          <h1 className="font-extrabold tracking-tight text-center text-3xl md:text-4xl mb-12 md:mb-16">
            My Account
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor={`firstName`} className="mb-1">
                First name
                <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id={`firstName`}
                  placeholder="Enter your first name..."
                  className="bg-white text-black"
                />
                <Button type="button" size={"icon"} variant={"ghost"}>
                  <Pencil />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor={`lastName`} className="mb-1">
                Last name
                <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id={`lastName`}
                  placeholder="Enter your last name..."
                  className="bg-white text-black"
                />
                <Button type="button" size={"icon"} variant={"ghost"}>
                  <Pencil />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor={`username`} className="mb-1">
                Username
                <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id={`username`}
                  placeholder="Enter your username..."
                  className="bg-white text-black"
                />
                <Button type="button" size={"icon"} variant={"ghost"}>
                  <Pencil />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor={`email`} className="mb-1">
                Email
                <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id={`email`}
                  placeholder="Enter your email..."
                  className="bg-white text-black"
                />{" "}
                <Button type="button" size={"icon"} variant={"ghost"}>
                  <Pencil />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor={`password`} className="mb-1">
                Password
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="text"
                id={`password`}
                placeholder="Enter your password..."
                className="bg-white text-black"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white md:mt-6">
              Change password
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
