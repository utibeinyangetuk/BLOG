const bcrypt = require("bcrypt")

exports.seed = function (knex) {
	return knex("users")
		.del()
		.then(async function () {
			return knex("users").insert([
				{
					id: 1,
					email: "admin@blog.com",
					username: "Admin",
					password: await bcrypt.hash("12345", 10),
				},
				{
					id: 2,
					username: "utibe2",
					email: "utibe2@gmail.com",
					password: await bcrypt.hash("12345", 10),
				},
				{
					id: 3,
					username: "utibe3",
					email: "utibe3@gmail.com",
					password: await bcrypt.hash("12345", 10),
				},
			])
		})
}
