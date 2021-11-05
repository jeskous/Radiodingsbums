import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
const prisma = new PrismaClient();

export async function createNewSong(lastSong: string, song: CurrentSong) {
  if (lastSong !== song.title) {
    await prisma.song.create({
      data: {
        interpret: song.interpret,
        title: song.title,
        channel: song.channel,
        createdAt: new Date(),
      },
    });
  }
}
