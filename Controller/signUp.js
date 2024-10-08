const blogModal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signUpHost = (req, res) => {
  req.flash("welcome", "Welcome To SignUp Page");
  res.render("signUp", { welcome: req.flash("welcome") });
};

const signUpPage = async (req, res) => {
  if (req.body.password == req.body.conPassword) {
    bcrypt.hash(req.body.password, saltRounds, async (err, hasPassword) => {
      const object = new blogModal({
        name: req.body.username,
        email: req.body.email,
        password: hasPassword,
      });

      const userData = new blogModal(object);

      try {
        await userData.save();
        res.redirect("/signIn");
      } catch (error) {
        res.redirect("/signUp");
        // console.log(error);
      }
    });
  } else {
    res.redirect("/");
  }
};

module.exports = { signUpHost, signUpPage };
