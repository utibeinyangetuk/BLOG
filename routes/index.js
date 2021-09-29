const router = require("express").Router()
const bcrypt = require("bcrypt")
const { authenticate } = require("passport")
const passport = require("passport")

const knex = require("../config/database")

// Function to check if the user is already logged in
const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/account")
  }
  next()
}

// TODO move routes to controller

// GET ROUTES
router.get("/", authenticated, (req, res, next) => {
  res.render("index", { title: "welcome page" })
})
router.get("/register", authenticated, (req, res, next) => {
  res.render("register", {
    title: "create an account",
  })
})
router.get("/login", authenticated, (req, res, next) => {
  res.render("login", {
    title: "Log into your account",
  })
})

// POST ROUTES
router.post("/register", async (req, res) => {
  let { username, email, password, confirm_password } = req.body

  // form validation
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
    res.render("register", { errors })
  } else {
    //If form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10)
    await knex("users")
      .whereRaw("email=?", [email])
      .then((results) => {
        if (results.rows > 0) {
          errors.push({ message: "Email is already in use" })
          res.render("register", { errors })
        } else {
          knex("users")
            .insert([
              { email: email, password: hashedPassword, username: username },
            ])
            .then((results) => {
              req.flash("success_msg", "Registration successful,Please login")
              res.redirect("/login")
            })
            .catch((err) => {
              throw err
            })
        }
      })
      .catch((err) => {
        throw err
      })
  }
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login",
    failureFlash: true,
  })
)
module.exports = router
