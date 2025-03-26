import AuthCardLayout from "@/components/layouts/auth-card-layout"
import Image from "next/image"
import React from "react"
import SignUp from "./sign-up"

export default function page() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          width={1728}
          height={1117}
          src="/background.png"
          alt="background of e-haven"
          className="size-full object-cover"
        />
      </div>

      <main className="mx-auto max-w-xl w-11/12 flex flex-col items-center gap-8 pb-20 md:pb-24">
        <div className="w-full mt-8">
          <Image
            width={642}
            height={141}
            src="/logo.png"
            alt="e-haven logo"
            className="size-full object-cover"
          />
        </div>

        <AuthCardLayout>
          <h2 className="text-center font-bold text-3xl md:text-4xl mb-8">
            Sign up
          </h2>

          <SignUp />
        </AuthCardLayout>
      </main>
    </>
  )
}
