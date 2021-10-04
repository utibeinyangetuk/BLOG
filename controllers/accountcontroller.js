module.exports = {
	index: (req, res) => {
		res.render("account", {
			title: "Account",
			user: req.user.username,
		})
	},

	blog: (req, res) => {
		res.render("blog", {
			title: "Recent posts",
		})
	},
	dashboard: (req, res) => {
		res.render("dashboard", {
			title: "dashboard",
		})
	},

	createpost: (req, res) => {
		res.render("createpost")
	},
	managepost: (req, res) => {
		res.render("managepost")
	},

	logout: (req, res) => {
		req.logout()
		req.flash("success_msg", "You have been logged out successfully")
		res.redirect("/login")
	},
}
