const { Router } = require("express");
const ItemModel = require("../models/item_model");
const router = Router();

router.get("/", async (req, res) => {
  const items = await ItemModel.find().populate("userId", "email name").lean();

  res.render("admin_page", {
    items: items,
  });
});

module.exports = router;
