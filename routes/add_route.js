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
    if (req.files) {
      var paths = req.files.map((file) => "/" + file.path);
    }

    console.log(req.body);

    const item = new ItemModel({
      title: req.body.title,
      type: req.body.type,
      num_rooms: req.body.num_rooms,
      repair: req.body.repair,
      level: req.body.level,
      total_level: req.body.total_level,
      space: req.body.space,
      description: req.body.description,
      price: req.body.price,
      //
      img: paths,
      //
      userId: req.user._id,
    });

    await item.save();
    res.redirect("/add");
    //
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
});

module.exports = router;
