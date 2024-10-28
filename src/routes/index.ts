import express, { Router } from "express";
export const indexRouter: Router = express.Router();

indexRouter.get("/", function (req, res, next) {
  res.render("index", { title: "Ateljé Angelina" });
});
