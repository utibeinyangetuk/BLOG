const knex = require("../config/database")
const { select } = require("../models/post")
module.exports = {
	account: async (req, res) => {
		await select().then((results) => {
			res.render("account", {
				title: "Account",
				user: req.user.username,
				post: results,
				author_name: req.user.username,
			})
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
