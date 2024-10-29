const Pattern = require("../models/pattern.ts");
const Patterntag = require("../models/patterntag.ts");
import asyncHandler from "express-async-handler";

exports.patterns_list = asyncHandler(async (req, res, next) => {
  const allPatterns = await Pattern.find({}, "name maker").sort({ name: 1 }).exec();

  res.render("patterns", { title: "Patterns List", patterns_list: allPatterns });
});

exports.patterns_detail = asyncHandler(async (req, res, next) => {
  const pattern = await Pattern.findById(req.params.id).exec();
  if (pattern == null) {
    const err = new Error("Pattern not found");
    res.status(404);
    return next(err);
  }
  res.render("patternDetail", { pattern: pattern });
});

exports.patterns_create_get = asyncHandler(async (req, res, next) => {
  const tags = await Patterntag.find({}, "name").exec();
  res.render("patternCreateForm", {
    options: [
      { name: "Beginner", id: "Beginner" },
      { name: "Intermediate", id: "Intermediate" },
      { name: "Advanced", id: "Advanced" },
    ],
    tags: tags,
  });
});

exports.patterns_create_post = asyncHandler(async (req, res, next) => {
  const newPattern = new Pattern({
    name: req.body.name,
    maker: req.body.maker,
    description: req.body.description,
    difficulty: req.body.difficulty,
    tags: req.body.tags + "aaaa",
  });

  // TODO validate fields

  newPattern
    .save()
    .then(() => {
      res.send("Successfully saved the new pattern");
    })
    .catch((err: any) => {
      console.error("Something went wrong: ", err);
      res.render("error", { error: err });
    });
});

exports.patterns_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns delete GET");
});

exports.patterns_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns delete POST");
});

exports.patterns_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns update GET");
});

exports.patterns_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns update POST");
});
