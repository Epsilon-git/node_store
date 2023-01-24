const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user_model");

router.get("/login", async (req, res) => {
  res.render("/", {
    loginError: req.flash("loginError"),
    regError: req.flash("regError"),
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        req.session.user = candidate;
        req.session.isАuthenticated = true;
        req.session.save((error) => {
          if (error) {
            throw error;
          }
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "Неверный пароль");
        res.redirect("/login#login");
      }
    } else {
      req.flash("loginError", "Такого пользователя не существует");
      res.redirect("/login#login");
    }
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body;
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      req.flash("regError", "Пользователь с таким email уже занят");
      res.redirect("/auth/login#register");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        email: email,
        name: name,
        password: hashPassword,
      });

      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log("ОШИБКА -> " + error);
  }
});

module.exports = router;
