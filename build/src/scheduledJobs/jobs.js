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
const axios_1 = __importDefault(require("axios"));
const Ndr2Scraper_1 = require("../scraper/ndr2/Ndr2Scraper");
const NjoyScraper_1 = require("../scraper/njoy/NjoyScraper");
const strings_1 = __importDefault(require("../config/strings"));
//jobs
exports.Jobs = {
    ndr2: () => __awaiter(void 0, void 0, void 0, function* () {
        node_schedule_1.default.scheduleJob("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield (0, Ndr2Scraper_1.getNdr2Song)();
            if (song) {
                yield (0, create_1.createNewSong)(strings_1.default.Chanel.NDR2, song);
            }
        }));
    }),
    njoy: () => {
        node_schedule_1.default.scheduleJob("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            const song = yield (0, NjoyScraper_1.getNjoySong)();
            if (song) {
                yield (0, create_1.createNewSong)(strings_1.default.Chanel.NJOY, song);
            }
        }));
    },
    preventIdle: () => {
        node_schedule_1.default.scheduleJob("*/20 * * * *", () => {
            axios_1.default.get("https://radio-overview.herokuapp.com/");
        });
    },
};
