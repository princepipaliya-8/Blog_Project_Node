const { log } = require("console");
const modal = require("../Modal/mongooes/mongooes");
const titleModal = require("../Modal/mongooes/title");
const defaultHost = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin", { welcome: req.flash("welcome") });
  } else {
    res.redirect("/signIn");
  }
};
const profile = async (req, res) => {
  const user = await modal.find();
  console.log("XXX", user);

  res.render("profile", { user });
};
const addTitle = async (req, res) => {
  res.render("addTitle");
};
const titleAdded = async (req, res) => {
  console.log("req", req.body);

  const obj = new modal({
    titlee: req.body.titlee,
    content: req.body.des,
  });
  console.log("obj", obj);

  const TitleData = new titleModal(obj);

  try {
    await TitleData.save();
    console.log("Title Added");
  } catch (error) {
    console.log("error");
  }
};
module.exports = { defaultHost, profile, addTitle, titleAdded };
