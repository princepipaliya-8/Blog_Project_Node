const modal = require("../Modal/mongooes/mongooes");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const otp_generator = require("otp-generator");
const nodemailer = require("nodemailer");
let otp = null;
// const tokenGenerator = require("token-generator");
const randomstring = require("randomstring");

const transpoter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "princepipaliya1781980@gmail.com",
    pass: "latpfesmwovbliyr",
  },
});

const forgetPass = (req, res) => {
  res.render("forget", { id: req.params.id });
};

const verifyEmail = (req, res) => {
  res.render("verifyEmail", { id: req.params.id });
};

const verifyEmailPost = async (req, res) => {
  const { email } = req.body;
  try {
    const findEmail = await modal.findOne({ email: email });

    if (findEmail) {
      console.log("Email found", findEmail);

      // otp = otp_generator.generate(4, {
      //   upperCaseAlphabets: false,
      //   specialChars: false,
      //   lowerCaseAlphabets: false,
      // });
      // console.log("Generated OTP:", otp);
      // res.redirect(`/forgetPass/${findEmail._id}`);
      res.render("checkMail");

      const token = randomstring.generate();
      console.log("token is", token);

      await modal.updateOne({ _id: findEmail._id }, { tokenReset: token });

      const link = `http://localhost:2020/verify/${findEmail._id}`;
      console.log(link);

      const mailOptions = {
        from: "princepipaliya1781980@gmail.com",
        to: findEmail.email,
        subject: `Your Password Reset Link `,
        text: `Your Password Reset Link is ${link}`,
      };

      transpoter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    } else {
      console.log("Email not found");
      res.redirect("/verifyEmail/:id");
    }
  } catch (error) {
    console.log("Error finding email:", error);
    res.redirect("/verifyEmail/:id");
  }
};

const verify = async (req, res) => {
  // res.render("verify", { id: req.params.id });

  const id = req.params.id;

  console.log("userId", id);

  try {
    const user = await modal.findOne({ _id: id });
    console.log("userrrrrrrrr", user);

    if (user) {
      console.log("valid token");

      if (user.tokenReset) {
        console.log("token", user.tokenReset);

        res.render("verify", { id: req.params.id });
      } else {
        console.log("invalid token");
      }
    } else {
      console.log("invalid token");
    }
  } catch (err) {
    console.log("err", err);

    // res.redirect("/err");
  }
};

const verifyOTP = (req, res) => {
  console.log("Submitted OTP:", req.body.otp);
  console.log("IDDDD", req.params.id);

  if (otp === req.body.otp) {
    res.redirect(`/verify/${req.params.id}`);
  } else {
    console.log("Incorrect OTP");
    res.redirect(`/forgetPass/${req.params.id}`);
  }
};

const changePWD = async (req, res) => {
  const { Password, ConPassword } = req.body;

  if (Password === ConPassword) {
    console.log("Password match");

    bcrypt.hash(Password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.log("Error hashing password:", err);
        return res.redirect(`/verify/${req.params.id}`);
      }
      try {
        const pwd = await modal.updateOne(
          { _id: req.params.id },
          { password: hashedPassword },
          { tokenReset: null }
        );
        console.log("Password updated", pwd);
        res.redirect("/signIn");
      } catch (error) {
        console.log("Error updating password:", error);
        res.redirect(`/verify/${req.params.id}`);
      }
    });
  } else {
    console.log("Password not match");
    res.redirect(`/verify/${req.params.id}`);
  }
};

module.exports = {
  forgetPass,
  verifyEmail,
  verifyEmailPost,
  verify,
  verifyOTP,
  changePWD,
};
