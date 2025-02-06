"use client"

import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import React from "react"

export default function PassInput() {
  const [showPass, setShowPass] = React.useState(false)

  return (
    <div className="flex items-center gap-2 border border-white rounded-md pr-3">
      <Input
        type={showPass ? "text" : "password"}
        placeholder="Enter your password..."
        className="border-0 focus-visible:ring-0"
      />
      <button
        type="button"
        className="hover:opacity-75"
        onClick={() => setShowPass(!showPass)}
      >
        {showPass ? <Eye /> : <EyeClosed />}
      </button>
    </div>
  )
}
