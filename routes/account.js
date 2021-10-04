const router = require("express").Router()
const {
	index,
	blog,
	dashboard,
	createpost,
	managepost,
	logout,
} = require("../controllers/accountcontroller")

const Notauthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/login")
}

router.get("/", Notauthenticated, index)
router.get("/blog", blog)
router.get("/dashboard", dashboard)
router.get("/createpost", createpost)
router.get("/managepost", managepost)
router.get("/logout", logout)

module.exports = router
