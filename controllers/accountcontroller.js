const knex = require("../config/database")
const { select } = require("../models/post")
module.exports = {
	account: async (req, res) => {
		await select().then((results) => {
			res.render("account", {
				title: "Account",
				user: req.user.username,
				post: results,
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
	readposts: async (req, res) => {
		let { id } = req.params
		let post = []
		if (id) {
			post = await knex("posts").where("id", id).first()
			post.comments = await knex("comments").where("post_id", post.id);
		}
		return res.render("readmore", {
			post: post,
			title: `${post.title}`,
		})
	},

	logout: (req, res) => {
		req.logout()
		req.flash("success_msg", "You have been logged out successfully")
		res.redirect("/login")
	},
}
