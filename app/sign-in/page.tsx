import AuthCardLayout from "@/components/layouts/auth-card-layout"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import SignIn from "./sign-in"

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
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

      <main className="mx-auto max-w-xl w-11/12 flex flex-col items-center gap-8">
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
            Sign in
          </h2>

          <SignIn modal={(await searchParams)?.modal || null} />

          <div className="flex items-center gap-2 justify-between">
            <p>Don&apos;t have an account?</p>
            <Link href="/sign-up" className="hover:underline">
              Sign up
            </Link>
          </div>
        </AuthCardLayout>
      </main>
    </>
  )
}
