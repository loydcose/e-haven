import React from "react"

export default function AuthCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-stone-800/90 p-6 md:p-10 rounded-xl text-white w-[90%] md:w-[80%]">
      {children}
    </div>
  )
}
