const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  status: String, // статус (проверяется/одобрено/отклонено)

  title: String, // Заголовок объявления

  type: String, // Тип недвижимости

  num_rooms: String, //  Количество комнат

  repair: String, //  Ремонт

  level: Number, //  Этаж

  total_level: Number, // Всего этажей

  space: Number, // Площадь

  description: String, // Описание

  img: [String], // Фотографии

  price: Number, // Цена

  views_num: Number, // Кол-во просмотров

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
