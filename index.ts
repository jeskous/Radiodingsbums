import express from "express";
import { testConnection } from "./prisma/database";
import { Jobs } from "./src/scheduledJobs/jobs";
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Server
const port = process.env.PORT || "4000";
app.listen(port, () => {
  //test prob. doesnt work properly
  testConnection();
  console.log("Server running on port: " + port);
});

//run jobs
Jobs.ndr2();
Jobs.njoy();
