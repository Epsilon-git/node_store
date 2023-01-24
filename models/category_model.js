const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: String,

  options: [String],
});

module.exports = model("categories", categorySchema);
