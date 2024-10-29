import express from "express";
export const patternsRouter = express.Router();
const patternsController = require("./../controllers/patternsController.ts");

patternsRouter.get("/", patternsController.patterns_list);

patternsRouter.get("/create", patternsController.patterns_create_get);
patternsRouter.post("/create", patternsController.patterns_create_post);

patternsRouter.get("/:id", patternsController.patterns_detail);
