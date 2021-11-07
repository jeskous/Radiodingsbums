"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNjoySong = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const NjoyUtils_1 = require("./NjoyUtils");
const url = "https://www.n-joy.de/";
function getNjoySong() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("launcing browser...");
        const browser = yield puppeteer_1.default.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        console.log("opening new Page (njoy)...");
        const page = yield browser.newPage();
        console.log("going to url...");
        yield page.goto(url);
        console.log("getting element...");
        const [SongString] = yield page.$x("/html/body/div[3]/div/div[1]/div[3]/div[1]/div[1]/div/div/p/span");
        const innerHTML = yield SongString.getProperty("innerHTML");
        const SongStringValue = yield innerHTML.jsonValue();
        console.log("splitting title and interpret from songstring...");
        const [interpret, title] = (0, NjoyUtils_1.formatSongString)(SongStringValue);
        console.log("creating object...");
        const song = {
            title: title,
            interpret: interpret,
            channel: "N-JOY",
        };
        console.log("returning new Song!");
        console.log(song);
        console.log("closing browser...");
        browser.close();
        return song;
    });
}
exports.getNjoySong = getNjoySong;
