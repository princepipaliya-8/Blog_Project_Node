const modal = require("../Modal/mongooes/mongooes");
const defaultHost = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin", {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  } else {
    res.redirect("/signIn");
  }
};
const profile = (req, res) => {
  res.render("profile", {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
};
module.exports = { defaultHost, profile };
