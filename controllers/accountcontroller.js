module.exports = {
  index: (req, res) => {
    res.render("account", {
      title: "Account",
      user: req.user.username,
    })
  },
  logout: (req, res) => {
    req.logout()
    req.flash("success_msg", "You have been logged out successfully")
    res.redirect("/login")
  },
}
