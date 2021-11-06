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
exports.Jobs = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const create_1 = require("../database/create");
const Ndr2Scraper_1 = require("../scraper/ndr2/Ndr2Scraper");
const NjoyScraper_1 = require("../scraper/njoy/NjoyScraper");
let lsNJOY;
let lsNDR2;
//jobs
exports.Jobs = {
    ndr2: () => __awaiter(void 0, void 0, void 0, function* () {
        node_schedule_1.default.scheduleJob("*/2 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield (0, Ndr2Scraper_1.getNdr2Song)();
            yield (0, create_1.createNewSong)(lsNDR2, song);
            lsNDR2 = song.title;
        }));
    }),
    njoy: () => {
        node_schedule_1.default.scheduleJob("*/2 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield (0, NjoyScraper_1.getNjoySong)();
            yield (0, create_1.createNewSong)(lsNJOY, song);
            lsNJOY = song.title;
        }));
    },
};
