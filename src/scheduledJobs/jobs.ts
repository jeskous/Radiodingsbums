import schedule from "node-schedule";
import { createNewSong } from "../database/create";
import axios from "axios";
import { getNdr2Song } from "../scraper/ndr2/Ndr2Scraper";
import { getNjoySong } from "../scraper/njoy/NjoyScraper";
import strings from "../config/strings";

//jobs
export const Jobs = {
  ndr2: async () => {
    schedule.scheduleJob("*/1 * * * *", async () => {
      const song = await getNdr2Song();
      if (song) {
        await createNewSong(strings.Chanel.NDR2, song);
      }
    });
  },

  njoy: () => {
    schedule.scheduleJob("*/1 * * * *", async () => {
      const song = await getNjoySong();
      if (song) {
        await createNewSong(strings.Chanel.NJOY, song);
      }
    });
  },
  preventIdle: () => {
    schedule.scheduleJob("*/20 * * * *", () => {
      axios.get("https://radio-overview.herokuapp.com/");
    });
  },
};
