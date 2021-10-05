const router = require("express").Router()
const passport = require("passport")
const { Register } = require("../controllers/userauth")
const {
	index,
	register,
	login,
	forgotpassword,
} = require("../controllers/usercontroller")
const { authenticated } = require("../controllers/checkcontroller")

// Get routes
router.get("/", authenticated, index)
router.get("/register", authenticated, register)
router.get("/login", authenticated, login)
router.get("/forgotpassword", authenticated, forgotpassword)

// Post routes
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
