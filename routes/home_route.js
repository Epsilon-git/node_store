const { Router } = require("express");
const ItemModel = require("../models/item_model");
const router = Router();

router.get("/", async (req, res) => {
  const items = await ItemModel.find().populate("userId", "email name").lean();

  res.render("home_page", {
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
  var qwe = await ItemModel.findById(req.params.id).lean();

  console.log(qwe);

  res.render("item_page", {
    item: await ItemModel.findById(req.params.id).lean(),
  });
});

router.get("/maxPrice/", async (req, res) => {
  var item = await ItemModel.findOne()
    .sort("-price")
    .select("price -_id")
    .lean();

  if (item !== null) {
    res.status(200).json(item.price);
  } else {
    res.status(200).json();
  }
});

module.exports = router;
