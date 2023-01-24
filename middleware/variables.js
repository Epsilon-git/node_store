// добавление разных параметров к всем ответам сервера

module.exports = function (req, res, next) {
  res.locals.isAuth = req.session.isАuthenticated;

  next();
};
