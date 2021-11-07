import schedule from "node-schedule";
import { createNewSong } from "../database/create";
import CurrentSong from "../interfaces/CurrentSong";
import { getNdr2Song } from "../scraper/ndr2/Ndr2Scraper";
import { getNjoySong } from "../scraper/njoy/NjoyScraper";

let lsNJOY: string;
let lsNDR2: string;

//jobs
export const Jobs = {
  ndr2: async () => {
    schedule.scheduleJob("*/10 */1 * * * *", async () => {
      const song = await getNdr2Song();
      if (song) {
        await createNewSong(lsNDR2, song);
        lsNDR2 = song.title;
      }
    });
  },

  njoy: () => {
    schedule.scheduleJob("*/10 */1 * * * *", async () => {
      const song = await getNjoySong();
      if (song) {
        await createNewSong(lsNJOY, song);
        lsNJOY = song.title;
      }
    });
  },
};
