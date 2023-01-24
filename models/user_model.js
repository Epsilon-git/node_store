const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  name: String,

  password: {
    type: String,
    required: true,
  },

  favourite: [
    {
      type: Schema.Types.ObjectId,
      ref: "items",
      required: true,
    },
  ],
});

userSchema.methods.addToFavourite = function (item) {
  const clonedFavourite = [...this.favourite];

  const idx = clonedFavourite.findIndex((e) => {
    return e.toString() === item._id.toString();
  });

  if (idx >= 0) {
    return;
  } else {
    clonedFavourite.push(item._id);
    this.favourite = clonedFavourite;
  }

  return this.save();
};

userSchema.methods.removeFromFavourite = function (id) {
  let clonedFavourite = [...this.favourite];

  const idx = clonedFavourite.findIndex((e) => {
    return e.toString() === id.toString();
  });

  if (idx >= 0) {
    clonedFavourite = clonedFavourite.filter((e) => {
      return e.toString() !== id.toString();
    });

    this.favourite = clonedFavourite;
  }

  return this.save();
};

module.exports = model("users", userSchema);
