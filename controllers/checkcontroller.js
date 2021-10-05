module.exports = {
	Notauthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next()
		}
		res.redirect("/login")
	},
	authenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return res.redirect("/account")
		}
		next()
	},
}
