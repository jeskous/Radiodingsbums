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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewSong = void 0;
const client_1 = require("@prisma/client");
const delete_1 = require("./delete");
const read_1 = require("./read");
const prisma = new client_1.PrismaClient();
function createNewSong(chanel, song) {
    return __awaiter(this, void 0, void 0, function* () {
        const lastSong = yield (0, read_1.getLastSongTitle)(chanel);
        if (lastSong !== song.title) {
            if (song.title != "") {
                if ((yield (0, read_1.getTotalRowCount)()) === 10000) {
                    console.log("deleting first entry...");
                    yield (0, delete_1.deleteFirstEntry)();
                }
                console.log("writing new song to db...");
                yield prisma.song.create({
                    data: {
                        interpret: song.interpret,
                        title: song.title,
                        channel: song.channel,
                    },
                });
            }
        }
    });
}
exports.createNewSong = createNewSong;
