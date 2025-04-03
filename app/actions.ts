"use server"

import { z } from "zod"
import db from "@/lib/db"
import { cookies } from "next/headers"
import { HealthLabel, verifyToken } from "@/lib/utils"
import bcrypt from "bcryptjs" // Import bcrypt for password hashing
import * as Sentry from "@sentry/nextjs"
import { Fields } from "./admin/tables/accommodations/accommodations-action"
import { revalidatePath } from "next/cache"
import { UTApi, UTFile } from "uploadthing/server"

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters")
    .max(128, "Confirm password must be at most 128 characters"),
})

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
      .email("Invalid email format")
      .min(8, "Email must be at least 8 characters")
      .max(128, "Email must be at most 128 characters"),
  })
  .merge(passwordSchema)
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
    Sentry.captureException(error)
    if (error instanceof Error) {
      console.error("Error fetching user by email:", error.message)
    } else {
      console.error("Error fetching user by email:", error)
    }
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
    Sentry.captureException(error)
    console.error("Error fetching user by ID:", error)
    return null
  }
}
// Define the user schema for validation
const userUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(128, "First name must be at most 128 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(128, "Last name must be at most 128 characters")
    .optional(),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(64, "Username must be at most 64 characters")
    .optional(),
  email: z
    .string()
    .email("Invalid email format")
    .min(8, "Email must be at least 8 characters")
    .max(128, "Email must be at most 128 characters")
    .optional(),
  hasShownCookieMsg: z.boolean().optional(),
})

export async function updateUser(userId: string, data: object) {
  try {
    // Validate the input data using zod
    const validationResult = userUpdateSchema.safeParse(data)
    if (!validationResult.success) {
      // Return the first validation error message
      return {
        success: false,
        message: validationResult.error.errors[0].message,
      }
    }

    // Check if the user exists
    const existingUser = await getUserById(userId)
    if (!existingUser) {
      return { success: false, message: "User not found" }
    }

    // Update the user in the database
    await db.user.update({
      where: { id: userId },
      data: data,
    })

    return { success: true, message: "User updated successfully" }
  } catch (error) {
    Sentry.captureException(error)
    if (error instanceof Error) {
      console.error("Error updating user:", error.message)
    } else {
      console.error("Error updating user:", error)
    }
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...rest } = formData
  const result = userSchema.safeParse(formData)
  if (!result.success) {
    return { message: result.error.errors[0].message }
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { username: formData.username },
    })
    if (existingUser) {
      return { success: false, message: "Username already exists" }
    }

    const existingEmail = await db.user.findUnique({
      where: { email: formData.email },
    })
    if (existingEmail) {
      return { success: false, message: "Email already exists" }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(formData.password, 10)

    // Store the user in the database with the hashed password
    await db.user.create({
      data: {
        ...rest,
        password: hashedPassword, // Use the hashed password
      },
    })

    return { success: true, message: "User created successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error creating user:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

// get all accommodations
export async function getAccommodations() {
  return await db.accommodation.findMany()
}

export async function getAccommodationsWithReservation() {
  return await db.accommodation.findMany({
    include: {
      reservations: true,
    },
  })
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
  gender: z
    .string()
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Gender is required in customer section",
    }),
  healthIssue: z
    .string()
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Health issue is required in customer section",
    }),
  guests: z.array(
    z.object({
      id: z.string().nonempty("Guest ID is required"),
      name: z.string().nonempty("Guest name is required"),
      birthday: z
        .date()
        .nullable()
        .refine((date) => date !== null, {
          message: "Guest birthday is required",
        }),
      gender: z
        .string()
        .nullable()
        .refine((value) => value !== null && value.trim() !== "", {
          message: "Gender is required in guest section",
        }),
      healthIssue: z
        .string()
        .nullable()
        .refine((value) => value !== null && value.trim() !== "", {
          message: "Health issue is required in guest section",
        }),
    })
  ),
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
  gender: "male" | "female"
  healthIssue: HealthLabel
  guests: {
    id: string
    name: string
    birthday: Date
    gender: "male" | "female"
    healthIssue: HealthLabel
  }[]
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
    Sentry.captureException(error)
    console.error("Error adding reservation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

export async function changePassword(
  userId: string,
  data: {
    currentPassword: string
    password: string
    confirmPassword: string
  }
) {
  const { currentPassword, password, confirmPassword } = data

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" }
  }

  const result = passwordSchema.safeParse({ password, confirmPassword })
  if (!result.success) {
    return { success: false, message: result.error.errors[0].message }
  }

  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { password: true },
    })

    if (!user) {
      return { success: false, message: "User not found" }
    }

    // Compare the current password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return { success: false, message: "Current password is incorrect" }
    }

    // Hash the new password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error changing password:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

export async function getBookDatesFromAccommodation(accommodationId: string) {
  return await db.reservation.findMany({
    where: { accommodationId },
    select: {
      checkIn: true,
      checkOut: true,
    },
  })
}

export async function getReservationsByUser(userId: string) {
  return await db.reservation.findMany({
    where: { userId },
    include: { accommodation: true, user: true },
  })
}

// delete reservation
export async function deleteReservation(reservationId: string) {
  try {
    await db.reservation.delete({ where: { id: reservationId } })
    return { success: true, message: "Reservation deleted successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error deleting reservation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

// get all users
export async function getUsers() {
  return await db.user.findMany()
}

// get all reservations
export async function getReservations() {
  return await db.reservation.findMany()
}

// get all reservations
export async function getReservationsWithUserAndAccommodation() {
  return await db.reservation.findMany({
    include: {
      user: true,
      accommodation: true,
    },
  })
}

// add review
export async function addReview(
  userId: string,
  data: {
    rating: number
    comment: string
  },
  overwrite: boolean = false
) {
  console.log(userId, data)

  try {
    // Check if the user already has a review
    const existingReview = await db.review.findFirst({
      where: { userId },
    })

    if (existingReview) {
      if (overwrite) {
        // Overwrite the existing review
        const updatedReview = await db.review.update({
          where: { id: existingReview.id },
          data: {
            rating: data.rating,
            comment: data.comment,
            updatedAt: new Date(), // Update the timestamp
          },
        })

        return {
          success: true,
          message: "Review updated successfully.",
          review: updatedReview,
        }
      } else {
        // Return failure if overwrite is false
        return {
          success: false,
          message: "You have already submitted a review.",
        }
      }
    }

    // Create a new review if no existing review is found
    const review = await db.review.create({
      data: {
        ...data,
        userId, // Associate the review with the user
      },
    })

    return { success: true, message: "Review added successfully.", review }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error adding review:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

// get all reviews with pagination
export async function getReviews(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit
  return await db.review.findMany({
    include: { user: true },
    skip,
    take: limit,
  })
}

export async function deleteUserAccount(userId: string) {
  const cookiesStore = await cookies()

  try {
    // Check if the user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { success: false, message: "User not found" }
    }

    // Delete all reservations associated with the user
    await db.reservation.deleteMany({
      where: { userId },
    })

    // Delete all reviews associated with the user
    await db.review.deleteMany({
      where: { userId },
    })

    // Finally, delete the user account
    await db.user.delete({
      where: { id: userId },
    })

    cookiesStore.delete("token")

    return {
      success: true,
      message: "User account and associated data deleted successfully",
    }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error deleting user account:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

const utapi = new UTApi()

async function deleteFileFromUploadThing(url: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Extract the file key from the URL
    const fileKey = url.split('/').pop()
    if (!fileKey) {
      return { success: false, message: "Invalid file URL" }
    }

    await utapi.deleteFiles([fileKey])
    return { success: true }
  } catch (error) {
    console.error("Error deleting file:", error)
    return { success: false, message: "Failed to delete the file" }
  }
}

async function uploadFileToUploadThing(
  base64Data: string,
  prefix: string
): Promise<{ success: true; url: string } | { success: false; message: string }> {
  try {
    // Extract the MIME type from the base64 string
    const mimeTypeMatch = base64Data.match(/data:(image\/[a-zA-Z]+);base64,/)
    if (!mimeTypeMatch) {
      return { success: false, message: "Invalid image format." }
    }

    const mimeType = mimeTypeMatch[1] // e.g., "image/png", "image/jpeg"
    const fileExtension = mimeType.split("/")[1] // e.g., "png", "jpeg"

    const base64Image = base64Data.split(",")[1]
    const buffer = Buffer.from(base64Image, "base64")

    // Generate a unique name and custom ID based on the file type
    const timestamp = Date.now()
    const name = `${prefix}-${timestamp}.${fileExtension}`
    const customId = `custom-${timestamp}`

    const file = new UTFile([buffer], name, {
      customId,
    })

    const uploadResponse = await utapi.uploadFiles([file])

    if (uploadResponse[0].error || !uploadResponse[0].data?.ufsUrl) {
      return { success: false, message: "File upload failed." }
    }

    return { success: true, url: uploadResponse[0].data.ufsUrl }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, message: "Failed to upload the file. Please try again." }
  }
}

// Define the Zod schema for validation
const accommodationSchema = z.object({
  image: z
    .string()
    .url("Please upload an image")
    .nullable()
    .refine((value) => value !== null && value.trim() !== "", {
      message: "Please upload an image",
    }),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().optional(),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  amenities: z.array(z.string()).nonempty("Amenities must not be empty"),
  numberOfBeds: z.number().min(0, "Number of beds must be at least 0"), // Allow 0 as a valid value
  price: z.number().min(0, "Price must be a positive number"),
  virtualPath: z.string().optional(),
})

export async function updateAccommodation(
  accommodationId: string,
  data: Fields
) {
  try {
    const validationResult = accommodationSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0].message,
      }
    }

    const validatedData = validationResult.data

    // Get current accommodation to check for existing image
    const currentAccommodation = await db.accommodation.findUnique({
      where: { id: accommodationId },
      select: { image: true }
    })

    // Handle accommodation image upload
    if (validatedData.image?.startsWith("data:image")) {
      // Delete old image if it exists
      if (currentAccommodation?.image) {
        const deleteResult = await deleteFileFromUploadThing(currentAccommodation.image)
        if (!deleteResult.success) {
          console.warn("Failed to delete old image:", deleteResult.message)
        }
      }

      const uploadResult = await uploadFileToUploadThing(validatedData.image, "image")
      if (!uploadResult.success) {
        return uploadResult
      }
      validatedData.image = uploadResult.url
    } else if (validatedData.image === null && currentAccommodation?.image) {
      // If image is being removed, delete the old one and set to null
      const deleteResult = await deleteFileFromUploadThing(currentAccommodation.image)
      if (!deleteResult.success) {
        console.warn("Failed to delete old image:", deleteResult.message)
      }
      validatedData.image = null
    }

    const bedKeywordRegex = /\d+x bed/
    if (validatedData.numberOfBeds === 0) {
      // @ts-expect-error any
      validatedData.amenities = validatedData.amenities.filter(
        (amenity) => !bedKeywordRegex.test(amenity)
      )
    } else {
      const bedKeyword = `${validatedData.numberOfBeds}x bed`
      // @ts-expect-error any
      validatedData.amenities = [
        ...validatedData.amenities.filter(
          (amenity) => !bedKeywordRegex.test(amenity)
        ),
        bedKeyword,
      ]
    }

    const { numberOfBeds, ...rest } = validatedData
    console.log(numberOfBeds)

    await db.accommodation.update({
      where: { id: accommodationId },
      // @ts-expect-error some values are null
      data: rest,
    })

    return { success: true, message: "Accommodation updated successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error updating accommodation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

// delete accommodation
export async function deleteAccommodation(accommodationId: string) {
  try {
    // First delete all reservations associated with this accommodation
    await db.reservation.deleteMany({
      where: { accommodationId },
    })

    // Then delete the accommodation
    await db.accommodation.delete({ 
      where: { id: accommodationId } 
    })

    // Revalidate both admin and accommodations pages
    revalidatePath("/admin/tables/accommodations")
    revalidatePath("/accommodations")

    return { success: true, message: "Accommodation deleted successfully!" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error deleting accommodation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

export async function createAccommodation(data: Fields) {
  try {
    const validationResult = accommodationSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0].message,
      }
    }

    const validatedData = validationResult.data

    if (validatedData.image?.startsWith("data:image")) {
      try {
        // Extract the MIME type from the base64 string
        const mimeTypeMatch = validatedData.image.match(
          /data:(image\/[a-zA-Z]+);base64,/
        )
        if (!mimeTypeMatch) {
          return { success: false, message: "Invalid image format." }
        }

        const mimeType = mimeTypeMatch[1] // e.g., "image/png", "image/jpeg"
        const fileExtension = mimeType.split("/")[1] // e.g., "png", "jpeg"

        const base64Image = validatedData.image.split(",")[1]
        const buffer = Buffer.from(base64Image, "base64")

        // Generate a unique name and custom ID based on the file type
        const timestamp = Date.now()
        const name = `image-${timestamp}.${fileExtension}` // e.g., "image-123456789.png"
        const customId = `custom-${timestamp}`

        const file = new UTFile([buffer], name, {
          customId,
        })

        const uploadResponse = await utapi.uploadFiles([file])

        if (uploadResponse[0].error) {
          return { success: false, message: "Image upload failed." }
        } else {
          // Log the uploaded file URL
          console.log("Uploaded file URL:", uploadResponse[0].data.ufsUrl)

          // Update the validatedData.image with the uploaded file URL
          validatedData.image = uploadResponse[0].data.ufsUrl
        }
      } catch (error) {
        console.error("Error uploading image:", error)
        return {
          success: false,
          message: "Failed to upload the image. Please try again.",
        }
      }
    }

    const bedKeywordRegex = /\d+x bed/
    if (validatedData.numberOfBeds === 0) {
      // @ts-expect-error any
      validatedData.amenities = validatedData.amenities.filter(
        (amenity) => !bedKeywordRegex.test(amenity)
      )
    } else {
      const bedKeyword = `${validatedData.numberOfBeds}x bed`
      // @ts-expect-error any
      validatedData.amenities = [
        ...validatedData.amenities.filter(
          (amenity) => !bedKeywordRegex.test(amenity)
        ),
        bedKeyword,
      ]
    }

    const { numberOfBeds, ...rest } = validatedData
    console.log(numberOfBeds)

    // Create the new accommodation
    await db.accommodation.create({
      // @ts-expect-error some values are null
      data: rest,
    })

    // Revalidate both admin and accommodations pages
    revalidatePath("/admin/tables/accommodations")
    revalidatePath("/accommodations")

    return { success: true, message: "Accommodation created successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error creating accommodation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}

export async function getReviewsWithUserAndAccommodation() {
  try {
    const reviews = await db.review.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return reviews
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return []
  }
}

export default async function updateReservation(
  reservationId: string,
  data: {
    status: "pending" | "accepted" | "paid"
    paymentMethod: string | null
    paymentDate: Date | null
    proofPayment?: string | null
  }
) {
  try {
    // Validation logic
    if (
      (data.status === "accepted" || data.status === "paid") &&
      (!data.paymentMethod?.trim() || !data.paymentDate)
    ) {
      return {
        success: false,
        message: "Payment method is required for accepted or paid status.",
      }
    }

    // Get current reservation to check for existing proof of payment
    const currentReservation = await db.reservation.findUnique({
      where: { id: reservationId },
      select: { proofPayment: true }
    })

    if (data.status === "pending") {
      data.paymentMethod = null
      data.paymentDate = null
      // Delete existing proof of payment if any
      if (currentReservation?.proofPayment) {
        const deleteResult = await deleteFileFromUploadThing(currentReservation.proofPayment)
        if (!deleteResult.success) {
          console.warn("Failed to delete old proof of payment:", deleteResult.message)
        }
      }
      data.proofPayment = null
    }

    // Handle proof of payment upload
    if (data.proofPayment?.startsWith("data:image")) {
      // Delete old proof of payment if it exists
      if (currentReservation?.proofPayment) {
        const deleteResult = await deleteFileFromUploadThing(currentReservation.proofPayment)
        if (!deleteResult.success) {
          console.warn("Failed to delete old proof of payment:", deleteResult.message)
        }
      }

      const uploadResult = await uploadFileToUploadThing(data.proofPayment, "proof-payment")
      if (!uploadResult.success) {
        return uploadResult
      }
      data.proofPayment = uploadResult.url
    } else if (data.proofPayment === null && currentReservation?.proofPayment) {
      // If proof of payment is being removed, delete the old one and set to null
      const deleteResult = await deleteFileFromUploadThing(currentReservation.proofPayment)
      if (!deleteResult.success) {
        console.warn("Failed to delete old proof of payment:", deleteResult.message)
      }
      data.proofPayment = null
    }

    // Update the reservation in the database
    await db.reservation.update({
      where: { id: reservationId },
      data: {
        status: data.status,
        paymentMethod: data.paymentMethod,
        paymentDate: data.paymentDate,
        proofPayment: data.proofPayment,
      },
    })

    return { success: true, message: "Reservation updated successfully" }
  } catch (error) {
    Sentry.captureException(error)
    console.error("Error updating reservation:", error)
    return { success: false, message: "Server error, please try again later." }
  }
}
