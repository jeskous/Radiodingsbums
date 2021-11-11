import express from "express";
const getRouter = express.Router();
import { PrismaClient } from "@prisma/client";
import CurrentSong from "../interfaces/CurrentSong";
const prisma = new PrismaClient();

//welcomeroute
getRouter.get("/", (req: express.Request, res: express.Response) => {
  res.json({ msg: "Welcome to RadioGermany" });
});

//get song by chanel
//example request: /chanel?name=ndr2
getRouter.get(
  "/chanel",
  async (req: express.Request, res: express.Response) => {
    //get chanel name
    const chName: string | undefined = req.query.name?.toString();
    //fetch from database where chanel = chanel name
    if (!chName) res.json({ msg: "invalid url parameters!" });

    const songs: Array<CurrentSong> = await prisma.song.findMany({
      where: { channel: chName },
    });
    //check if there are songs
    //if no return error msg
    if (songs.length <= 0) res.json({ msg: "no songs found" });
    //if yes return songs
    res.json({ msg: "success", data: { amount: songs.length, songs } });
  }
);

export default getRouter;
