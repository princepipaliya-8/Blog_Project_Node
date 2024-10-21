const express = require("express");
const controller = require("../Controller/controller");
const signIncontroller = require("../Controller/signIn");
const signUpcontroller = require("../Controller/signUp");
const blogcontroller = require("../Controller/blog");
const passwordCghange = require("../Controller/passwordChange");
const forgetPass = require("../Controller/forgetPass");
const logout = require("../Controller/logout");
const images = require("../middleWere/multer");
const passport = require("../middleWere/passport");
const auth = require("../middleWere/AC");
// const { register } = require("module");
const routes = express.Router();
// Dashbord
routes.get("/", auth, controller.defaultHost);
// logout
routes.get("/logout", logout.logout);
// profile
routes.get("/profile", controller.profile);
// logIn
routes.get("/signIn", signIncontroller.signInHost);
routes.post("/login", passport.authenticate("local", { failureRedirect: "/signIn" }), signIncontroller.signInPage);
// Register
routes.get("/signUp", signUpcontroller.signUpHost);
routes.post("/register", signUpcontroller.signUpPage);
// Blog
routes.get("/blogs", auth, blogcontroller.blogHost);
routes.post("/blog/add", images.single("bImage"), blogcontroller.blogPage);
routes.get("/my-blogs", blogcontroller.myBlogs);
routes.get("/blogs/add", auth, blogcontroller.blogsPage);
routes.get("/blogs/edit/:id", auth, blogcontroller.editBlog);
routes.post("/updateBlog/:id", images.single("bImage"), blogcontroller.blogUpdate);
routes.get("/blogs/delete/:id", auth, blogcontroller.blogsDelete);
routes.post("/comments", blogcontroller.commentBlog);
// Authentication
routes.get("/passwordChange", passwordCghange.pwdChange);
routes.post("/changePwd", passwordCghange.pwdChangePost);
routes.get("/forgetPass/:id", forgetPass.forgetPass);
routes.get("/verifyEmail/:id", forgetPass.verifyEmail);
routes.post("/verifyEmailPost/:id", forgetPass.verifyEmailPost);
routes.get("/verify/:id", forgetPass.verify);
routes.post("/verifyOTP/:id", forgetPass.verifyOTP);
routes.post("/pwdChange/:id", forgetPass.changePWD);
// Title
routes.get("/addTitle", controller.addTitle);
routes.post("/titleAdded", controller.titleAdded);
routes.get("/deleteTitle/:id", controller.deleteTitle);
routes.get("/subTitle", controller.subTitle);
routes.post("/subTitleAdded", controller.subTitlePost);
routes.get("/subTitleView", controller.subTitleView);

module.exports = routes;
