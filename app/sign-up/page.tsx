import AuthCardLayout from "@/components/layouts/auth-card-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React from "react"

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
            Sign up
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">First name</label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your first name..."
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your last name..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password..."
            />
          </div>

          <div className="flex flex-col gap-1 mb-8">
            <label htmlFor="confirmPassword">Confirm password</label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password..."
            />
          </div>

          <Button
            type="button"
            size={"lg"}
            className="mb-8 w-full font-bold text-lg h-12"
          >
            Sign up
          </Button>
        </AuthCardLayout>
      </main>
    </>
  )
}
