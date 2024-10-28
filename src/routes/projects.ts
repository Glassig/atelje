import express from "express";
export const projectsRouter = express.Router();

projectsRouter.get("/", function (req, res, next) {
  res.render("projects", { title: "Ateljé Angelina" });
});
