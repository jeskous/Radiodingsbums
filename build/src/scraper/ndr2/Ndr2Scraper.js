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
exports.getNdr2Song = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://www.ndr.de/ndr2/index.html";
function getNdr2Song() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("launcing browser...");
            const browser = yield puppeteer_1.default.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });
            console.log("opening new Page...");
            const page = yield browser.newPage();
            console.log("going to url...");
            yield page.goto(url);
            console.log("getting element...");
            const title = yield page.$eval("#titleNow", (el) => el.innerHTML);
            const interpret = yield page.$eval("#interpretNow", (el) => el.innerHTML);
            console.log("creating object...");
            const song = {
                title: title,
                interpret: interpret,
                channel: "NDR2",
            };
            console.log("returning new Song!");
            console.log(song);
            return song;
        }
        catch (err) {
            console.log("getNdr2Song - ERROR");
            console.log(err);
        }
    });
}
exports.getNdr2Song = getNdr2Song;
