const { Router } = require("express");
const ItemModel = require("../models/item_model");
const auth = require("../middleware/auth");
const router = Router();

function mapFavouriteItems(favourite) {
  return favourite.map((item) => ({ ...item._doc, id: item.id }));
}

router.get("/", auth, async (req, res) => {
  const user = await req.user.populate("favourite").execPopulate();

  const favourite = mapFavouriteItems(user.favourite);

  res.render("favourite_page", {
    userName: req.user.name,
    favourite,
  });
});

router.post("/add", auth, async (req, res) => {
  const item = await ItemModel.findById(req.body.id);
  await req.user.addToFavourite(item);
});

router.delete("/remove/:id", auth, async (req, res) => {
  await req.user.removeFromFavourite(req.params.id);

  const user = await req.user.populate("favourite").execPopulate();

  const favourite = mapFavouriteItems(user.favourite);

  res.status(200).json(favourite);
});

module.exports = router;
