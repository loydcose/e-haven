"use server"

import { z } from "zod"
import db from "@/lib/db"

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

export async function addUser(formData: {
  firstName: string
  lastName: string
  username: string
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

    await db.user.create({ data: formData })
  } catch {
    return { message: "Server error, please try again later." }
  }
}
