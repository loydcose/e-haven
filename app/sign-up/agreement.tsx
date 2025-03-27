import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import React from "react"

export default function Agreement({
  hasCheckAgreement,
  setHasCheckAgreement,
}: {
  hasCheckAgreement: boolean
  setHasCheckAgreement: (value: boolean) => void
}) {
  return (
    <div className="flex items-start gap-2 mb-8 text-sm">
      <Checkbox
        id="terms"
        className="border-white mt-0.5"
        checked={hasCheckAgreement}
        onCheckedChange={setHasCheckAgreement}
      />
      <label htmlFor="terms">
        I agree to the{" "}
        <Link
          href="/terms-condition"
          target="_blank"
          className="hover:underline font-bold"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          className="hover:underline font-bold"
        >
          Privacy Policy
        </a>
        .
      </label>
    </div>
  )
}
