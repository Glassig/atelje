import { Schema, model } from "mongoose";

const PatterntagSchema = new Schema({
  name: { type: String, required: true, maxLength: 25 },
});

PatterntagSchema.virtual("url").get(function () {
  return `/patterntag/${this._id}`;
});

module.exports = model("Patterntag", PatterntagSchema);
