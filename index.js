// подключение всяких библиотек
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const compression = require("compression");
const MongoStore = require("connect-mongodb-session")(session);
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
//
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorHandler = require("./middleware/error");
const fileMiddleware = require("./middleware/file");
//
// пути до страниц (регистрация роутов)
const homeRoute = require("./routes/home_route");
const itemsRoute = require("./routes/my_items_route");
const addRoute = require("./routes/add_route");
const favouriteRoute = require("./routes/favourite_route");
const authRoute = require("./routes/auth_route");
const adminRoute = require("./routes/admin_route");

//
// какие то константы
const MONGODB_URI = `mongodb+srv://epsilon:99ipenat@cluster0.boyyg7k.mongodb.net/MyDb`;
const app = express();
//
// регистрация движка 'handlebars'
const hbs = exphbs.create({
  defaultLayout: "main_layout",
  extname: "hbs",
  helpers: require("./utils/hbs-helpers"),
});
//
// настройка сессии которая храниться в базе данных
const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
});
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//
// настройки для 'handlebars'
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
//
// подклюение папок для быстрого доступа (мини настройка проекта)
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));

//
// активация промежуточных проверок (чего-то промежуточного)
app.use(varMiddleware);
app.use(userMiddleware);
app.use(fileMiddleware.array("img"));
app.use(compression());
app.use(flash());
app.use(bodyParser.json());

//
// подклюение путей до страниц
app.use("/", homeRoute);
app.use("/items", itemsRoute);
app.use("/add", addRoute);
app.use("/favourite", favouriteRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

//
app.use(errorHandler);
//
// порт
const PORT = process.env.PORT || 3000;
//
// старт сервера NodeJS
async function start() {
  try {
    // для подключения к БД

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    // запуск приложения
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}/`);
    });
    //
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
}
//
//
start();
//
//
