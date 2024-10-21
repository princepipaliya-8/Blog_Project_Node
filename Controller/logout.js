const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next();
    }
  });
  req.flash("logout", "Logout Successfully");
  res.redirect("/signIn");
};

module.exports = { logout };
