const { log } = require("console");
const modal = require("../Modal/mongooes/mongooes");
const titleModal = require("../Modal/mongooes/title");
const subTitleModal = require("../Modal/mongooes/subTitle");
const defaultHost = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render("admin", {
      name: req.user.name,
      email: req.user.email,
      welcome: req.flash("welcome"),
    });
  } else {
    res.redirect("/signIn");
  }
};
const profile = async (req, res) => {
  console.log("reqwecd", req.user);

  res.render("profile", { name: req.user.name, email: req.user.email });
};
const addTitle = async (req, res) => {
  const data = await titleModal.find({});
  console.log("data", data);

  res.render("addTitle", { data });
};
const titleAdded = async (req, res) => {
  console.log("req", req.body);

  const obj = new titleModal({
    entry: req.body.titlee,
    content: req.body.des,
  });

  try {
    const TitleData = new titleModal(obj);
    await TitleData.save();
    res.redirect("/addTitle");
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
  // console.log("data", data.title);

  try {
    const topic = await titleModal.find({});
    const subTopic = await subTitleModal.find({}).populate("topic");
    console.log("Topic", topic);
    console.log("subTopic", subTopic);

    res.render("subTitle", { topic, subTopic });
  } catch (error) {
    console.log("error", error);
  }
};
const subTitlePost = async (req, res) => {
  res.send("JAy Hooo");
  // const subTitle = new subTitleModal({
  //   title: req.body.titlee,
  // });

  // const data = await subTitle.save();

  // console.log("data", data);
  // console.log("sTitle", subTitle);
};
module.exports = {
  defaultHost,
  profile,
  addTitle,
  titleAdded,
  deleteTitle,
  subTitle,
  subTitlePost,
};
