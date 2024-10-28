const Pattern = require("../models/pattern.ts");
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
  res.render("pattern_detail", { pattern: pattern });
});

exports.patterns_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns create GET");
});

exports.patterns_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: patterns create POST");
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
