const blogModal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");

const signInHost = (req, res) => {
  req.flash("welcome", "Welcome To Login Page");
  res.render("signIn", {
    welcome: req.flash("welcome"),
  });
};
const signInPage = async (req, res) => {
  const user = await blogModal.find({ email: req.body.email });
  console.log(user);

  if (user.length > 0) {
    console.log("req", req.body, user[0].password);

    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      console.log(err, result);
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
