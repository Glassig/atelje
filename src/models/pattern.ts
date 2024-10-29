import { Schema, model } from "mongoose";

const PatternSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, index: true },
  maker: { type: String, required: true, maxLength: 100 },
  description: { type: String },
  difficulty: [{ type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Patterntag" }],
});

PatternSchema.virtual("url").get(function () {
  return `/patterns/${this._id}`;
});

module.exports = model("Pattern", PatternSchema);
