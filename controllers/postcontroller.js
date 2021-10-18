const { insert, select } = require("../models/post");
const knex = require("../config/database")
module.exports = {
	Insertpost: async (req, res) => {
		let { title, content } = req.body;
		await insert([
			{
				author_id: req.user.id,
				author_name: req.user.username,
				title: title,
				content: content,
			},
		])
			.then(() => {
				req.flash("success_msg", "Post uploaded successfully");
				return res.redirect("/account");
			})
			.catch((err) => {
				throw err;
			});
	},

	Selectpost: async (req, res) => {
		await select();
	},

	updatepost: async (req, res) => {
		let { id } = req.params;
		let { title, content } = req.body;
		if (id) {
			await knex("posts")
				.update({
					title: title,
					content: content,
				})
				.where("id", id)
				.then(() => {
					req.flash("success_msg", "Your post has been updated✅");
					res.redirect("/account/manageposts");
				})
				.catch((err) => {
					throw err;
				});
		}
	},
};
