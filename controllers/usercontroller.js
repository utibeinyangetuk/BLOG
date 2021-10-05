module.exports = {
	index: (req, res) => {
		res.render("index", {
			title: "welcome page",
		})
	},
	register: (req, res) => {
		res.render("register", {
			title: "create an account",
		})
	},
	login: (req, res) => {
		res.render("login", {
			title: "Log into your account",
		})
	},
	forgotpassword: (req, res) => {
		res.render("forgotpassword", {
			title: "Recover your password",
		})
	},
}
