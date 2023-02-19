const { Router } = require("express");
const ItemModel = require("../models/item_model");
const router = Router();

const type = require("../res/type");
const repair = require("../res/repair");
const num_rooms = require("../res/num_rooms");

router.get("/", async (req, res) => {
  const items = await ItemModel.find().populate("userId", "email name").lean();

  res.render("home_page", {
    type: type,
    num_rooms: num_rooms,
    repair: repair,

    items,
  });
});

router.get("/filter/", async (req, res) => {
  var items = await ItemModel.find().populate("userId", "email name").lean();

  // фильтр цены
  if (req.query.price_lower != "") req.query.price_lower = 0;
  items = items.filter((e) => {
    if (e.price >= req.query.price_lower) {
      return e;
    }
  });

  // фильтр цены
  if (req.query.price_upper != "") {
    items = items.filter((e) => {
      if (e.price <= req.query.price_upper) {
        return e;
      }
    });
  }

  // фильтр типа
  if (req.query.type != "Все" && req.query.type != "null") {
    items = items.filter((e) => {
      return e.type == req.query.type;
    });
  }

  // фильтр кол-ва комнат
  if (req.query.num_rooms != "Все" && req.query.num_rooms != "null") {
    items = items.filter((e) => {
      return e.num_rooms == req.query.num_rooms;
    });
  }

  res.status(200).json(items);
});

router.get("/item/:id", async (req, res) => {
  var item = await ItemModel.findById(req.params.id).lean();

  res.render("item_page", {
    item: item,
    avg_price: Math.round(item.price / item.space),
  });

  await ItemModel.findByIdAndUpdate(item._id, {
    views_num: (item.views_num += 1),
  });
});

module.exports = router;
