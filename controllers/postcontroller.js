const knex = require("../config/database")
const { insert, select } = require("../models/post")

module.exports = {
	Insertpost: async (req, res) => {
		let { title, content } = req.body
		await insert([
			{
				author_id: req.user.id,
				author_name: req.user.username,
				title: title,
				content: content,
			},
		])
			.then(() => {
				req.flash("success_msg", "Post uploaded successfully")
				return res.redirect("/account")
			})
			.catch((err) => {
				throw err
			})
	},
	Selectpost: async (req, res) => {
		await select()
	},
}
