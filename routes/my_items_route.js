const { Router } = require("express");
const ItemModel = require("../models/item_model");
const auth = require("../middleware/auth");
const router = Router();

const type = require("../res/type");
const repair = require("../res/repair");
const num_rooms = require("../res/num_rooms");

router.get("/", auth, async (req, res) => {
  const items = await ItemModel.find({ userId: { _id: req.user._id } })
    .populate("userId", "_id")
    .lean();

  res.render("my_items_page", { items });
});

router.get("/:id", async (req, res) => {
  const item = await ItemModel.findById(req.params.id).lean();
  res.render("item_page", {
    item,
  });
});

router.get("/:id/edit", auth, async (req, res) => {
  // "allow=true" - разрешение на выполнение, иначе переадресация на глав. страницу
  if (!req.query.allow) {
    return res.redirect("/");
  }

  const item = await ItemModel.findById(req.params.id).lean();

  res.render("item_edit_page", {
    title: `Редактировать ${item.title}`,
    item,
    type: type,
    num_room: num_rooms,
    repair: repair,
  });
});

router.post("/edit", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  await ItemModel.findByIdAndUpdate(id, req.body).lean();

  res.redirect("/items");
});

router.post("/remove", auth, async (req, res) => {
  try {
    await ItemModel.deleteOne({ _id: req.body.id });
    res.redirect("/items");
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
});

module.exports = router;
