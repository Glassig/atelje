import createError from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { indexRouter } from "./routes/index";
import { patternsRouter } from "./routes/patterns";
import { projectsRouter } from "./routes/projects";
import mongoose from "mongoose";
import { mongo } from "./config";

const app: Express = express();
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  console.log("Connecting to MongoDB");
  const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
  console.log("Connected to version: ", connection.version);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/patterns", patternsRouter);
app.use("/projects", projectsRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
