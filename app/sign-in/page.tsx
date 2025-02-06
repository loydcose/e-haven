import AuthCardLayout from "@/components/layouts/auth-card-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import PassInput from "./pass-input"

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

          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="username">Username</label>
            <Input type="text" placeholder="Enter your username..." />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="password">Password</label>
            <PassInput />
          </div>

          <div className="flex items-center justify-between gap-2 mb-8">
            <Link href="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
            <Link href="/admin-login" className="hover:underline">
              Admin login
            </Link>
          </div>

          <Button
            type="button"
            size={"lg"}
            className="mb-8 w-full font-bold text-lg h-12"
          >
            Login account
          </Button>

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
