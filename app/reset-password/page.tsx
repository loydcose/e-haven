import AuthCardLayout from "@/components/layouts/auth-card-layout"
import Image from "next/image"
import React from "react"
import ResetPassword from "./reset-password"
import TokenInvalid from "./token-invalid"

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const token = searchParams?.token
  let isValidToken = false

  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/verify-token-on-reset`,
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
      isValidToken = data.success // Check if the token is valid
    } else {
      isValidToken = false
    }
  } catch (error) {
    console.error("Error verifying token:", error)
  }

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
          {/* Render InvalidToken if the token is invalid, otherwise ResetPassword */}
          {isValidToken ? <ResetPassword token={token}/> : <TokenInvalid />}
        </AuthCardLayout>
      </main>
    </>
  )
}
