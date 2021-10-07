const router = require("express").Router()
const knex = require("../config/database")
const {
	account,
	dashboard,
	createposts,
	manageposts,
	readposts,
	logout,
} = require("../controllers/accountcontroller")
const { Notauthenticated } = require("../controllers/checkcontroller")
const { Insertpost } = require("../controllers/postcontroller")

// Get routes
router.get("/", Notauthenticated, account)
router.get("/dashboard", Notauthenticated, dashboard)
router.get("/createposts", Notauthenticated, createposts)
router.get("/manageposts", Notauthenticated, manageposts)
router.get("/posts/:id", readposts)
router.get("/logout", Notauthenticated, logout)

//Post routes
router.post("/", Insertpost)

module.exports = router
