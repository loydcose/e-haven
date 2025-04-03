import NavBar from "@/components/nav-bar"
import React from "react"
import Footer from "@/components/footer"

import Fields from "./fields"
import { getUserById, getUserFromToken } from "../actions"

export default async function page() {
  const payload = await getUserFromToken()
  const user = await getUserById(payload?.id as string)

  if (!payload || !user) {
    return <h1>An error has occurred. Please try to refresh this window.</h1>
  }

  console.log(user)

  return (
    <main className="relative bg-[#663C1F">
      <section className="mx-auto w-11/12 z-10">
        <NavBar />
        <div className="mb-16 bg-[#663C1F] p-6 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl">
          <h1 className="font-extrabold tracking-tight text-center text-3xl md:text-4xl mb-12 md:mb-16">
            My Account
          </h1>

          <Fields user={user} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
