const knex = require("../config/database");
module.exports = {
	Comments: async (req, res) => {
		await knex("comments")
			.insert([
				{
					post_id: req.params.post_id,
					name: req.user.username,
					content: req.body.comment,
				},
			])
			.then(() => {
				req.flash("success_msg", "Your comment has been sent successfully✅");
				res.redirect(`/account/posts/${req.params.post_id}`);
			})
			.catch((err) => {
				throw err;
			});
	},
};
