require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { AppDataSource } from "./app/data-source";
import { router } from "./router/index";
const app = express();
const port = process.env.PORT || 8081;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    app.listen(port, async () => {
      await AppDataSource.initialize();
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
