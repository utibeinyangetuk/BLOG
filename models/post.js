const knex = require("../config/database")
module.exports = {
	insert: async (posts) => {
		return await knex("posts").insert(posts);
	},
	select: async () => {
		return await knex("posts").select();
	},
	viewpost: async (posts) => {
		return await knex("posts").where("id", posts).first();
	},
	manageposts: async (posts) => {
		return await knex("posts").where("author_id", posts);
	},
};
