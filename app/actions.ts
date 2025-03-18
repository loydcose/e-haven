"use server"

import { z } from "zod"
import db from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/utils"

const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(128, "First name must be at most 128 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(128, "Last name must be at most 128 characters"),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(64, "Username must be at most 64 characters"),
    email: z
      .string()
      .min(8, "Email must be at least 8 characters")
      .max(128, "Email must be at most 128 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password must be at most 128 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
      .max(128, "Confirm password must be at most 128 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export async function getUserFromToken() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("token")?.value
  if (!token) return null
  return await verifyToken(token)
}

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    })
    return user
  } catch (error) {
    console.error("Error fetching user by email:", error.message)
    return null
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    })
    return user || null
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}

export async function updateUser(userId: string, data: object) {
  try {
    const existingUser = await getUserById(userId)
    if (!existingUser) {
      return { success: false, message: "User not found" }
    }

    await db.user.update({
      where: { id: userId },
      data,
    })

    return { success: true, message: "User updated successfully" }
  } catch (error) {
    console.error("Error updating user:", error.message)
    return { success: false, message: "Server error, please try again later." }
  }
}

export async function addUser(formData: {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}) {
  const result = userSchema.safeParse(formData)
  if (!result.success) {
    return { message: result.error.errors[0].message }
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { username: formData.username },
    })
    if (existingUser) {
      return { message: "Username already exists" }
    }

    // @ts-expect-error email is not exist in type never
    if (existingUser && existingUser.email === formData.email) {
      return { message: "Email already exists" }
    }

    await db.user.create({ data: formData })
  } catch {
    return { message: "Server error, please try again later." }
  }
}

// get all accommodations
export async function getAccommodations() {
  return await db.accommodation.findMany()
}

// get single accommodation base on slug
export async function getAccommodation(slug: string) {
  return await db.accommodation.findUnique({ where: { slug } })
}
const reservationSchema = z.object({
  accommodationId: z.string().nonempty("Accommodation ID is required"),
  userId: z.string().nonempty("User ID is required"),
  checkIn: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Check-in date is required",
    }),
  checkOut: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Check-out date is required",
    }),

  address: z.string().nonempty("Address is required"),
  birthday: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Customer birthday is required",
    }),
  contactNumber: z.string().nonempty("Contact number is required"),
  guests: z
    .array(
      z.object({
        id: z.string().nonempty("Guest ID is required"),
        name: z.string().nonempty("Guest name is required"),
        birthday: z
          .date()
          .nullable()
          .refine((date) => date !== null, {
            message: "Guest birthday is required",
          }),
      })
    )
    .nonempty("At least one guest is required"),
  totalPrice: z.number().positive("Total price must be greater than zero"),
})

// add reservation
export async function addReservation(reservationData: {
  accommodationId: string
  userId: string
  checkIn: Date
  checkOut: Date
  address: string
  birthday: Date
  contactNumber: string
  guests: { id: string; name: string; birthday: Date }[]
  totalPrice: number
}) {
  console.log(reservationData)
  // Validate the input data
  const result = reservationSchema.safeParse(reservationData)
  if (!result.success) {
    const error = result.error.errors[0] // Get the first validation error
    console.log(error.message) // Log the error message

    // Check if the error path is either 'userId' or 'accommodationId'
    if (
      error.path.includes("userId") ||
      error.path.includes("accommodationId")
    ) {
      return {
        success: false,
        message: "Server error, please try again later.",
      }
    }

    // Return the specific error message for other validation errors
    return { success: false, message: error.message }
  }

  try {
    // Add the reservation to the database
    console.log(reservationData)
    await db.reservation.create({
      data: reservationData,
    })
    return { success: true, message: "Reservation added successfully" }
  } catch (error) {
    console.error("Error adding reservation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}
