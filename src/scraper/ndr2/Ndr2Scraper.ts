import puppeteer from "puppeteer";
import CurrentSong from "../../interfaces/CurrentSong";

const url: string = "https://www.ndr.de/ndr2/index.html";

export async function getNdr2Song() {
  try {
    console.log("launcing browser...");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("opening new Page...");
    const page = await browser.newPage();
    console.log("going to url...");
    await page.goto(url);
    console.log("getting element...");
    const title = await page.$eval("#titleNow", (el) => el.innerHTML);
    const interpret = await page.$eval("#interpretNow", (el) => el.innerHTML);
    console.log("creating object...");
    const song: CurrentSong = {
      title: title,
      interpret: interpret,
      channel: "NDR2",
    };
    console.log("returning new Song!");
    console.log(song);
    return song;
  } catch (err) {
    console.log("getNdr2Song - ERROR");
    console.log(err);
  }
}
