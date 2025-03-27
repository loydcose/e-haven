"use client"

import React from "react"
import Agreement from "../sign-up/agreement"
import { useReservationStore } from "@/stores/reservation"

export default function AgreementCheck() {
  const { hasCheckAgreement, setHasCheckAgreement } = useReservationStore()

  return (
    <Agreement
      hasCheckAgreement={hasCheckAgreement}
      setHasCheckAgreement={setHasCheckAgreement}
    />
  )
}
