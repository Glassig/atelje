import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  pattern: { type: Schema.Types.ObjectId, ref: "Pattern", required: true },
  description: { type: String },
  fabric: [{ type: String }],
  modifications: { type: String },
  notes: { type: String },
});

ProjectSchema.virtual("url").get(function () {
  return `/project/${this._id}`;
});

module.exports = model("Project", ProjectSchema);
