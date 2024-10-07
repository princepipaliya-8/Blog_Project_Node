const { log } = require("console");
const modal = require("../Modal/mongooes/mongooes");
const defaultHost = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin");
  } else {
    res.redirect("/signIn");
  }
};
const profile = async (req, res) => {
  const user = await modal.find();
  console.log("XXX", user);

  res.render("profile", { user });
};
module.exports = { defaultHost, profile };
