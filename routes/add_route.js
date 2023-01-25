const { Router } = require("express");
const ItemModel = require("../models/item_model");
const auth = require("../middleware/auth");
const router = Router();

const type = ["Квартира", "Квартира в новостройке", "Дом/Дача", "Коттедж"];
const num_rooms = ["1", "2", "3", "4", "5 и более"];
const repair = ["Косметический", "Евро", "Дизайнерский", "Без ремонта"];

router.get("/", auth, (req, res) => {
  res.render("add_page", {
    type: type,
    num_room: num_rooms,
    repair: repair,
  });
});

router.post("/", auth, async (req, res) => {
  try {
    console.log("req.body");
    console.log(req.body);

    console.log("req.files");
    console.log(req.files);

    // if (req.files) {
    //   var paths = req.files.map((file) => "/" + file.path);
    // }

    // const item = new ItemModel({
    //   title: req.body.title,
    //   price: req.body.price,
    //   img: paths,
    //   num_rooms: req.body.num_rooms,
    //   space: req.body.space,
    //   description: req.body.description,
    //   type: req.body.type,
    //   userId: req.user._id,
    // });

    // await item.save();
    res.redirect("/add");
    //
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
});

module.exports = router;
