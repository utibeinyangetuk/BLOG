const bcrypt = require("bcrypt");
const knex = require("../config/database");
const { insert, select } = require("../models/user");

module.exports = {
	Register: async (req, res) => {
		let { username, email, password, password2 } = req.body;

		// form validation.
		let errors = []; //Create an empty array where all errors will be pushed to.
		if (!username || !email || !password || !password2) {
			errors.push({ message: "Please complete all fields" });
		}
		if (password.length < 5) {
			errors.push({ message: "Password should be at least 5 characters long" });
		}
		if (password != password2) {
			errors.push({ message: "Passwords do not match" });
		}
		if (errors.length > 0) {
			res.render("register", { errors });
		} else {
			let hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password before storing it in the database.

			await select(email) // Loops through the database to see if the email has already been registered.
				.then((results) => {
					if (results[0]) {
						// Throw an error if user exists.
						errors.push({ message: "Email is already registered" });
						res.render("register", { errors });
					} else {
						// If user doesn't exist,create the user.
						insert([
							{
								username: username,
								email: email,
								password: hashedPassword,
							},
						])
							.then(() => {
								req.flash(
									"success_msg",
									"Registration successful,please login"
								);
								res.redirect("/login");
							})
							.catch((err) => {
								throw err;
							});
					}
				})
				.catch((err) => {
					throw err;
				});
		}
	},
};
