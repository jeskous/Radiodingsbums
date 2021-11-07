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
exports.getLastSongTitle = exports.getFirstRow = exports.getTotalRowCount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getTotalRowCount() {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield prisma.song.findMany()).length;
    });
}
exports.getTotalRowCount = getTotalRowCount;
function getFirstRow() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.song.findFirst();
    });
}
exports.getFirstRow = getFirstRow;
function getLastSongTitle(channel) {
    return __awaiter(this, void 0, void 0, function* () {
        const songs = yield prisma.song.findMany({ where: { channel: channel } });
        return songs.length > 0 ? songs[songs.length - 1].title : "";
    });
}
exports.getLastSongTitle = getLastSongTitle;
