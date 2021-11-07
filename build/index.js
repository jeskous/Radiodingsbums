"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./prisma/database");
const jobs_1 = require("./src/scheduledJobs/jobs");
const cors = require("cors");
const app = (0, express_1.default)();
//middleware
app.use(cors());
app.use(express_1.default.json());
//Server
const port = process.env.PORT || "4000";
app.listen(port, () => {
    //test prob. doesnt work properly
    (0, database_1.testConnection)();
    console.log("Server running on port: " + port);
});
//run jobs
jobs_1.Jobs.ndr2();
jobs_1.Jobs.njoy();
jobs_1.Jobs.preventIdle();
