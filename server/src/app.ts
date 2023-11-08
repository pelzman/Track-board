import http from "http";
import createError, { HttpError } from "http-errors";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import { port } from "./config/config";
import connection from "./config/database";
import logger from "morgan";
import UserRoute from "./routes/user-route";
import cookieParser from "cookie-parser";
import TaskRoute from "./routes/task-route";

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connection
  .sync({})
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err: HttpError) => {
    console.log(err);
  });

app.use("/api", UserRoute);
app.use("/api", TaskRoute);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});
