const knex = require("../config/database")

module.exports = {
	select: async (email) => {
		return await knex("users").where("email", email);
	},
	insert: async (users) => {
		return await knex("users").insert(users);
	},
};
