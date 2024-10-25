const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatternSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  maker: { type: String, required: true, maxLength: 100 },
  description: { type: String },
  difficulty: [{ type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Patterntag" }],
});

PatternSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/pattern/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pattern", PatternSchema);
