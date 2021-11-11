import express from "express";
import { testConnection } from "./prisma/database";
import getRouter from "./src/routes/Get";

import { Jobs } from "./src/scheduledJobs/jobs";
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api", getRouter);

//Server
const port = process.env.PORT || "4000";
app.listen(port, () => {
  //test prob. doesnt work properly
  testConnection();
  console.log("Server running on port: " + port);
});

//run jobsç
Jobs.ndr2();
Jobs.njoy();
Jobs.preventIdle();
