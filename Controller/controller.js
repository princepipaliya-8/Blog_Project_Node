const { log } = require("console");
const modal = require("../Modal/mongooes/mongooes");
const titleModal = require("../Modal/mongooes/title");
const subTitleModal = require("../Modal/mongooes/subTitle");
const defaultHost = async (req, res) => {
  if (req.isAuthenticated()) {
    req.flash("dash", "Welcome To Dashbord");
    res.render("admin", {
      name: req.user.name,
      email: req.user.email,
      welcome: req.flash("welcome"),
      dash: req.flash("dash"),
    });
  } else {
    req.flash("pwdWrong", "Authentication Failed");
    res.redirect("/signIn");
  }
};
const profile = async (req, res) => {
  console.log("reqwecd", req.user);
  req.flash("welcome", "Welcome To Profile Page");
  res.render("profile", { name: req.user.name, email: req.user.email, welcome: req.flash("welcome") });
};
const addTitle = async (req, res) => {
  const data = await titleModal.find({});
  console.log("data", data);
  req.flash("welcome", "Welcome To Add Title Page");
  res.render("addTitle", { data, welcome: req.flash("welcome") });
};
const titleAdded = async (req, res) => {
  console.log("req", req.body);

  const obj = new titleModal({
    entry: req.body.titlee,
    content: req.body.des,
    userId: req.user._id,
  });
  console.log("obbjjjj", obj);

  try {
    const TitleData = new titleModal(obj);
    await TitleData.save();
    res.redirect("/subTitle");
  } catch (error) {
    console.log("error");
  }
};
const deleteTitle = async (req, res) => {
  const { id } = req.params;

  const deleteTitle = await titleModal.findByIdAndDelete({ _id: id });
  console.log("delete");

  res.redirect("/addTitle");
};
const subTitle = async (req, res) => {
  try {
    const topic = await titleModal.find({});
    console.log("topic", topic);

    const subTopic = await subTitleModal.find({}).populate("topic");
    console.log("subTopic", subTopic);

    req.flash("welcome", "Welcome To Add SubTitle Page");
    res.render("subTitle", { topic, subTopic, welcome: req.flash("welcome") });
  } catch (error) {
    console.log("error", error);
  }
};
const subTitlePost = async (req, res) => {
  try {
    const obj = new subTitleModal({
      title: req.body.titlee,
      topic: req.body.subentry,
    });
    console.log("obj", obj);
    const subTopic = new subTitleModal(obj);
    await subTopic.save();
    res.redirect("/subTitleView");
  } catch (error) {
    console.log("error", error);
  }
};
const subTitleView = async (req, res) => {
  const topic = await titleModal.find({});
  const subTopic = await subTitleModal.find({}).populate("topic");
  console.log("Topic", topic);
  console.log("subTopic", subTopic);

  req.flash("welcome", "Welcome To All Title Page");

  res.render("subtopicView", { topic, subTopic, welcome: req.flash("welcome") });
};
module.exports = {
  defaultHost,
  profile,
  addTitle,
  titleAdded,
  deleteTitle,
  subTitle,
  subTitlePost,
  subTitleView,
};
