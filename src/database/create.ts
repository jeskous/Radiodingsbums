import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
import { deleteFirstEntry } from "./delete";
import { getLastSongTitle, getTotalRowCount } from "./read";
const prisma = new PrismaClient();

export async function createNewSong(chanel: string, song: CurrentSong) {
  if ((await getLastSongTitle(chanel)) !== song.title) {
    if ((await getTotalRowCount()) === 10000) {
      console.log("deleting first entry...");
      await deleteFirstEntry();
    }
    console.log("writing new song to db...");
    await prisma.song.create({
      data: {
        interpret: song.interpret,
        title: song.title,
        channel: song.channel,
      },
    });
  }
}
