import NavBar from "@/components/nav-bar"
import Image from "next/image"
import React from "react"
import Footer from "@/components/footer"

/*
{
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
*/

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const token = (await searchParams)?.token
  let isValidToken = false
  let errorMessage = "Invalid or expired token"

  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/verify-token-from-email-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    )

    if (response.ok) {
      const data = await response.json()
      console.log({ data })
      if (data.success) {
        isValidToken = true
      } else {
        errorMessage = data.message
        isValidToken = false
      }
      isValidToken = data.success
    } else {
      isValidToken = false
    }
  } catch (error) {
    console.error("Error verifying token:", error)
  }

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
        <div className="mb-16 bg-amber-900/75 p-6 md:p-16 text-white max-w-[1150px] mx-auto rounded-xl text-center">
          <h1 className="font-extrabold tracking-tight text-center text-2xl md:text-3xl mb-6 md:mb-8">
            {!isValidToken ? "There was an error." : "Email has been verified!"}
          </h1>
          <p>
            {!isValidToken
              ? errorMessage
              : "Your email has been successfully verified. You can now close this page."}
          </p>
        </div>
      </section>
      <Footer />
    </main>
  )
}
