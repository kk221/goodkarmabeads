import { PrismaClient } from '@prisma/client'

// Remove TypeScript syntax and use regular JavaScript
const globalForPrisma = global

// Check if prisma exists in the global object
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient()
}

export const prisma = globalForPrisma.prisma

export default prisma