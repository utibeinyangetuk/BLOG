const knex = require("../config/database");
const {
	select,
	viewpost,
	manageposts,
	updateposts,
} = require("../models/post");
module.exports = {
	account: async (req, res) => {
		await select().then((results) => {
			res.render("account", {
				title: "Account",
				user: req.user.username,
				post: results,
			});
		});
	},
	dashboard: (req, res) => {
		res.render("dashboard", {
			title: "Dashboard",
		});
	},
	createposts: (req, res) => {
		res.render("createposts", {
			title: "Create a post",
		});
	},
	manageposts: async (req, res) => {
		let { id } = req.user;
		await manageposts(id).then((results) => {
			return res.render("manageposts", {
				title: "your recent posts",
				posts: results,
			});
		});
	},
	deleteposts: async (req, res) => {
		let { id } = req.params;
		await knex("posts")
			.del()
			.where("id", id)
			.then(() => {
				req.flash("success_msg", "Post deleted✅");
				return res.redirect("/account/manageposts");
			})
			.catch((err) => {
				throw err;
			});
	},
	readposts: async (req, res) => {
		let { id } = req.params;
		let post = [];
		if (id) {
			post = await viewpost(id);
			post.comments = await knex("comments").where("post_id", post.id);
		}
		return res.render("readmore", {
			post: post,
			title: `${post.title}`,
		});
	},
	updateposts: async (req, res) => {
		let { id } = req.params;
		let post = [];
		if (id) {
			post = await updateposts(id);
		}
		return res.render("updateposts", {
			post: post,
			title: "update your post",
		});
	},
	logout: (req, res) => {
		req.logout();
		req.flash("success_msg", "You have been logged out successfully");
		res.redirect("/login");
	},
};
