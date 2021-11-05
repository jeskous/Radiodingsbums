import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Database  Connection successfull");
    await prisma.$disconnect();
  } catch (err) {
    console.log("Database Connection failed");
  }
}
