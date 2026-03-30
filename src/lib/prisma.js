import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: require("@prisma/adapter-pg").PrismaPg({
      url: process.env.DATABASE_URL,
    }),
  });

console.log("ENV CHECK:", process.env.DATABASE_URL);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
