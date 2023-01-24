const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  title: String,

  price: Number,

  type: String,

  num_rooms: String,

  space: Number,

  description: String,

  img: [String],

  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

itemSchema.method("toClient", function () {
  const item = this.toObject();

  item.id = item._id;
  delete item._id;

  return item;
});

module.exports = model("items", itemSchema);
