const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  pattern: { type: Schema.Types.ObjectId, ref: "Pattern", required: true },
  description: { type: String },
  fabric: [{ type: String }],
  modifications: { type: String },
  notes: { type: String },
});

// Virtual for author's URL
ProjectSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/project/${this._id}`;
});

// Export model
module.exports = mongoose.model("Project", ProjectSchema);
