module.exports = function (req, res, next) {

  if (!req.session.isАuthenticated) {
    return res.redirect("/auth/login");
  }

  next();
};
