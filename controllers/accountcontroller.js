const knex = require("../config/database")

module.exports = {
	account: (req, res) => {
		res.render("account", {
			title: "Account",
			user: req.user.username,
		})
	},

	dashboard: (req, res) => {
		res.render("dashboard", {
			title: "Dashboard",
		})
	},

	createposts: (req, res) => {
		res.render("createposts", {
			title: "Create a post",
		})
	},
	manageposts: (req, res) => {
		res.render("manageposts", {
			title: "Your posts inventory",
		})
	},

	logout: (req, res) => {
		req.logout()
		req.flash("success_msg", "You have been logged out successfully")
		res.redirect("/login")
	},
}
