import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

import { connect_db } from "./config/db.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", router);

connect_db();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
