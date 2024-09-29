const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next();
    }
  });
  res.redirect("/signIn");
};

module.exports = { logout };
