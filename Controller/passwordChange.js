const modal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");

let otp = null;

const pwdChange = (req, res) => {
  res.render("passwordChange");
};

const pwdChangePost = (req, res) => {
  const { password } = req.user;

  const { curPass, newPassword, conPassword } = req.body;

  bcrypt.compare(curPass, password, (err, result) => {
    if (err) {
      console.log("Error comparing passwords:", err);
      return res.redirect("/passwordChange");
    }
    if (result) {
      if (newPassword === conPassword) {
        console.log("Password match");
        bcrypt.hash(newPassword, saltRounds, async (err, hashedPassword) => {
          if (err) {
            console.log("Error hashing password:", err);
            return res.redirect("/passwordChange");
          }
          try {
            const pwd = await modal.updateOne(
              { email: req.user.email },
              { password: hashedPassword }
            );
            console.log("Password updated", pwd);
            res.redirect("/signIn");
          } catch (error) {
            console.log("Error updating password:", error);
            res.redirect("/passwordChange");
          }
        });
      } else {
        console.log("New passwords do not match");
        res.redirect("/passwordChange");
      }
    } else {
      console.log("Current password does not match");
      res.redirect("/passwordChange");
    }
  });
};

module.exports = {
  pwdChange,
  pwdChangePost,
};
