import schedule from "node-schedule";
import { createNewSong } from "../database/create";
import { getNdr2Song } from "../scraper/ndr2/Ndr2Scraper";
import { getNjoySong } from "../scraper/njoy/NjoyScraper";

let lsNJOY: string;
let lsNDR2: string;

//jobs
export const Jobs = {
  ndr2: async () => {
    schedule.scheduleJob(" */2 * * * *", async () => {
      const song = await getNdr2Song();
      await createNewSong(lsNDR2, song);
      lsNDR2 = song.title;
    });
  },

  njoy: () => {
    schedule.scheduleJob("*/5 * * * * *", async () => {
      const song = await getNjoySong();
      await createNewSong(lsNJOY, song);
      lsNJOY = song.title;
    });
  },
};
