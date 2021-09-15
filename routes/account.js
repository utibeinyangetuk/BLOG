var router = require("express").Router()

/* GET account listing. */
router.get("/", function (req, res, next) {
  res.render("account", {
    title: "Account",
    user: "brillz",
  })
})

module.exports = router
