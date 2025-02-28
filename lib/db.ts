import { PrismaClient } from "@prisma/client"

declare const global: { prisma?: PrismaClient }

const db = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = db

export default db
