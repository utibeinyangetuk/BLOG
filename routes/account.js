const router = require("express").Router()
const knex = require("../config/database");
const {
	account,
	dashboard,
	createposts,
	manageposts,
	readposts,
	logout,
	deleteposts,
} = require("../controllers/accountcontroller");
const { Notauthenticated } = require("../controllers/checkcontroller");
const { Comments } = require("../controllers/commentcontroller");
const { Insertpost } = require("../controllers/postcontroller");

// Get routes
router.get("/", Notauthenticated, account);
router.get("/dashboard", Notauthenticated, dashboard);
router.get("/createposts", Notauthenticated, createposts);
router.get("/manageposts", Notauthenticated, manageposts);
router.get("/posts/:id", readposts);



router.get("/posts/update/:id", async (req, res) => {
	let { id } = req.params;
	let post = [];
	if (id) {
		post = await knex("posts").where("id", id).first();
	}
	return res.render("updateposts", {
		post: post,
		title: "update your post",
	});
});
router.get("/posts/delete/:id", deleteposts);

router.get("/logout", Notauthenticated, logout);

//Post routes
router.post("/", Insertpost);
router.post("/comments/:post_id", Comments);

router.post("/posts/update/:id", async (req, res) => {
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
});

module.exports = router
