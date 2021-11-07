import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
const prisma = new PrismaClient();

export async function getTotalRowCount() {
  return (await prisma.song.findMany()).length;
}

export async function getFirstRow() {
  return await prisma.song.findFirst();
}

export async function getLastSongTitle(channel: string) {
  const songs = await prisma.song.findMany({ where: { channel: channel } });
  return songs ? songs[songs.length - 1].title : "";
}
