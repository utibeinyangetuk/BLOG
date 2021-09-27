var router = require("express").Router()



function Notauthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

/* GET account listing. */
router.get("/", Notauthenticated, function (req, res, next) {
  res.render("account", {
    title: "Account",
    user:req.user.username
  })
})

router.get("/logout", (req, res) => {
  req.logout()
  req.flash("success_msg", "You have been logged out successfully")
  res.redirect("/login")
})

module.exports = router
