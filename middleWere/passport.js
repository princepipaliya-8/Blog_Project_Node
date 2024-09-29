const passport = require("passport");
const passportLocal = require("passport-local");
const userModal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");

passport.use(
  new passportLocal(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      const userData = await userModal.findOne({ email: email });
      if (userData) {
        bcrypt.compare(password, userData.password, async (err, result) => {
          if (err) {
            done(null, false);
          }

          if (result) {
            done(null, userData);
          } else {
            done(null, false);
          }
        });
      } else {
        done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModal.findById(id);
    // console.log("user", user);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
