import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
import { deleteFirstEntry } from "./delete";
import { getLastSongTitle, getTotalRowCount } from "./read";
const prisma = new PrismaClient();

export async function createNewSong(chanel: string, song: CurrentSong) {
  const lastSong = await getLastSongTitle(chanel);
  if (lastSong !== song.title && lastSong !== "") {
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
