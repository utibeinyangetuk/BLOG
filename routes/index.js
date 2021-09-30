const router = require("express").Router()
const passport = require("passport")
const { Register } = require("../controllers/userauth")
const { index, register, login } = require("../controllers/usercontroller")

// Function to check if a user is already logged in
const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/account")
  }
  next()
}

router.get("/", authenticated, index)
router.get("/register", authenticated, register)
router.get("/login", authenticated, login)

router.post("/register", Register)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login",
    failureFlash: true,
  })
)
module.exports = router
