const router = require("express").Router()
const knex=require("../config/database")
const {
	account,
	dashboard,
	createposts,
	manageposts,
	logout,
} = require("../controllers/accountcontroller")
const { Notauthenticated } = require("../controllers/checkcontroller")

// Get routes
router.get("/", Notauthenticated, account)
router.get("/dashboard", Notauthenticated, dashboard)
router.get("/createposts", Notauthenticated, createposts)
router.get("/manageposts", Notauthenticated, manageposts)
router.get("/logout", Notauthenticated, logout)



//Post routes
router.post('/',async (req, res) => {
let {title,content}=req.body
await knex("posts").insert({
	author_id:req.user.id,
	title:title,
	content:content
}).then((results) => {
	console.log(results)
return res.render("account");
}).catch((err) => {
	throw err
})
});

module.exports = router
