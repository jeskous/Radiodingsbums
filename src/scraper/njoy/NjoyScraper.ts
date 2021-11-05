import puppeteer from "puppeteer";
import CurrentSong from "../../interfaces/CurrentSong";
import { formatSongString } from "./NjoyUtils";

const url: string = "https://www.n-joy.de/";

export async function getNjoySong() {
  console.log("launcing browser...");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("opening new Page (njoy)...");
  const page = await browser.newPage();
  console.log("going to url...");
  await page.goto(url);
  console.log("getting element...");

  const [SongString] = await page.$x(
    "/html/body/div[3]/div/div[1]/div[3]/div[1]/div[1]/div/div/p/span"
  );
  const innerHTML = await SongString.getProperty("innerHTML");
  const SongStringValue: string = await innerHTML.jsonValue();
  console.log("splitting title and interpret from songstring...");
  const [interpret, title] = formatSongString(SongStringValue);

  console.log("creating object...");
  const song: CurrentSong = {
    title: title,
    interpret: interpret,
    channel: "N-JOY",
  };
  console.log("returning new Song!");
  console.log(song);
  return song;
}
