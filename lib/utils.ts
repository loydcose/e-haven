import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtVerify } from "jose"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Encode the JWT secret
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// Function to verify the JWT token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.error({ code: error.code, message: "Token expired" })
    } else {
      console.error("Invalid token:", error.message)
    }
    return null
  }
}

export type HealthLabel =
  | "None"
  | "Hypertension"
  | "Diabetes"
  | "Migraine"
  | "Skin Conditions"
  | "Mental Health Disorders"
  | "Heart Disease"
  | "Tuberculosis"
  | "Asthma"

export const healthIssues = [
  { label: "None", value: "none" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Migraine", value: "migraine" },
  { label: "Skin Conditions", value: "skin-conditions" },
  { label: "Mental Health Disorders", value: "mental-health-disorders" },
  { label: "Heart Disease", value: "heart-disease" },
  { label: "Tuberculosis", value: "tuberculosis" },
  { label: "Asthma", value: "asthma" },
]

export const getDaysReserved = (
  checkIn: Date | null,
  checkOut: Date | null
) => {
  if (!checkIn || !checkOut) {
    return 0
  }

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  // Calculate the number of days reserved, ensuring inclusive calculation
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime()
  const daysReserved = Math.floor(timeDifference / (1000 * 3600 * 24)) + 1

  // Ensure at least one day is charged
  return daysReserved < 1 ? 1 : daysReserved
}
