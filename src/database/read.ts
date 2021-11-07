import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
const prisma = new PrismaClient();

export async function getTotalRowCount() {
  return (await prisma.song.findMany()).length;
}

export async function getFirstRow() {
  return await prisma.song.findFirst();
}
