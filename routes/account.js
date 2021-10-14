const router = require("express").Router();
const {
	account,
	dashboard,
	createposts,
	manageposts,
	readposts,
	logout,
	deleteposts,
	updateposts,
} = require("../controllers/accountcontroller");
const { Notauthenticated } = require("../controllers/checkcontroller");
const { Comments } = require("../controllers/commentcontroller");
const { Insertpost, updatepost } = require("../controllers/postcontroller");

// Get routes
router.get("/", Notauthenticated, account);
router.get("/dashboard", Notauthenticated, dashboard);
router.get("/createposts", Notauthenticated, createposts);
router.get("/manageposts", Notauthenticated, manageposts);
router.get("/posts/:id", readposts);
router.get("/posts/update/:id", updateposts);
router.get("/posts/delete/:id", deleteposts);
router.get("/logout", Notauthenticated, logout);

//Post routes
router.post("/", Insertpost);
router.post("/comments/:post_id", Comments);
router.post("/posts/update/:id", updatepost);

module.exports = router;
