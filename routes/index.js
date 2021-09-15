const router = require("express").Router()
const bcrypt = require("bcrypt")

// TODO move this out too
const knex = require("../config/database")

// TODO move routes to controller
router.get("/", function (req, res, next) {
  res.render("index", { title: "welcome page" })
})
router.get("/signup", (req, res, next) => {
  res.render("signup", {
    title: "create an account",
  })
})
router.get("/login", (req, res, next) => {
  res.render("login", {
    title: "Log into your account",
  })
})

//TODO move this route to a controller
router.post("/signup", async (req, res) => {
  let { username, email, password, confirm_password } = req.body
  // TODO take out this log
  // console.log({ username, email, password, confirm_password })

  let errors = []
  if (!username || !email || !password || !confirm_password) {
    errors.push({ message: "Please enter all fields" })
  }

  if (password.length < 5) {
    errors.push({ message: "Password should be at least 5 characters long" })
  }
  if (password != confirm_password) {
    errors.push({ message: "Passwords do not match" })
  }
  if (errors.length > 0) {
    res.render("signup", { errors })
  } else {
    // form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10)
    // TODO take this out
    // console.log(hashedPassword)

    await knex("users")
      .then((results) => {
        // console.log(results)

        if (results.length > 0) {
          console.log("code reaches here")
          console.log("if youre seeing this then there is an error")
          errors.push({ message: "Email is already in use" })
          res.render("signup", { errors })
        }
      })
      .catch((err) => {
        throw err
      })
  }
})

module.exports = router
