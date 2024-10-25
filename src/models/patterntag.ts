const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PatterntagSchema = new Schema({
  name: { type: String, required: true, maxLength: 25 },
});

// Virtual for author's URL
PatterntagSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/patterntag/${this._id}`;
});

// Export model
module.exports = mongoose.model("Patterntag", PatterntagSchema);
