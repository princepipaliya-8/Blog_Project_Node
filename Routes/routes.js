const express = require("express");
const controller = require("../Controller/controller");
const signIncontroller = require("../Controller/signIn");
const signUpcontroller = require("../Controller/signUp");
const blogcontroller = require("../Controller/blog");
const logout = require("../Controller/logout");
const images = require("../middleWere/multer");
const passport = require("../middleWere/passport");
const auth = require("../middleWere/AC");
const routes = express.Router();

routes.get("/", auth, controller.defaultHost);
routes.get("/logout", logout.logout);
routes.get("/profile", controller.profile);

routes.get("/signIn", signIncontroller.signInHost);
routes.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/signIn" }),
  signIncontroller.signInPage
);

routes.get("/signUp", signUpcontroller.signUpHost);
routes.post("/register", signUpcontroller.signUpPage);

routes.get("/blogs", auth, blogcontroller.blogHost);
routes.get("/blogs/add", auth, blogcontroller.blogsPage);
routes.post("/blog/add", images.single("bImage"), blogcontroller.blogPage);
routes.get("/blogs/edit/:id", auth, blogcontroller.editBlog);
routes.post(
  "/updateBlog/:id",
  images.single("bImage"),
  blogcontroller.blogUpdate
);

routes.get("/blogs/delete/:id", auth, blogcontroller.blogsDelete);
module.exports = routes;
