const blogModal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");

const signInHost = (req, res) => {
  res.render("signIn", {
    logout: req.flash("logout"),
  });

};
const signInPage = async (req, res) => {
  const user = await blogModal.find({ email: req.body.email });

  if (user.length > 0) {
    console.log("user", user);

    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      if (result) {
        req.flash("welcome", "Welcome To Dashboard");

        res.redirect("/");
      } else {
        res.redirect("/signIn");
      }
    });
  } else {

    res.redirect("/signUp");
  }
};

module.exports = { signInHost, signInPage };
