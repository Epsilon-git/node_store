const { Router } = require("express");
const ItemModel = require("../models/item_model");
const UserModel = require("../models/user_model");
const router = Router();

router.get("/", async (req, res) => {
  const items = await ItemModel.find().populate("userId", "email name").lean();

  res.render("admin_page", {
    items: items,
  });
});

router.get("/inspection", async (req, res) => {
  const items = await ItemModel.find({ status: "проверяется" })
    .populate("userId", "_id")
    .lean();

  res.render("admin_page_inspection", {
    items: items,
  });
});

router.post("/inspection", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  console.log(req.body);

  // await ItemModel.findByIdAndUpdate(id, req.body);

  await ItemModel.findByIdAndUpdate(id, {status: "одобрено"});

  res.redirect("/admin/inspection");
});

router.get("/users", async (req, res) => {
  const users = await UserModel.find().lean();

  console.log(users);

  res.render("admin_page_accounts", {
    users: users,
  });
});

module.exports = router;
