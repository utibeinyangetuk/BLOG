const router = require("express").Router()
const { index, logout } = require("../controllers/accountcontroller")

const Notauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

router.get("/", Notauthenticated, index)

router.get("/logout", logout)

module.exports = router
