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
router.get("/posts/delete/:id", deleteposts);


router.get("/logout", Notauthenticated, logout);

//Post routes
router.post("/", Insertpost);
router.post("/comments/:post_id", Comments);

module.exports = router
