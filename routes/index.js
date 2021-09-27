const router = require("express").Router()
const bcrypt = require("bcrypt")
const { authenticate } = require("passport")
const passport = require("passport")
const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: "5432",
})

/*
 Middleware that checks if the user is already logged in and then restricts the user from accessing this route again untill user logs out
 */
function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/account")
  }
  next()
}

// TODO move routes to controller

// GET ROUTES
router.get("/", (req, res, next) => {
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
  // TODO remove this
  let { username, email, password, confirm_password } = req.body
  console.log({
    username,
    email,
    password,
    confirm_password,
  })
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
    // form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10)
    // TODO remove this
    console.log("HashedPassword:", hashedPassword)

    // checks database to see if the email already exists
    pool.query(
      `SELECT * from users WHERE email=$1`,
      [email],
      (err, results) => {
        if (err) {
          throw err
        }
        if (results.rows.length > 0) {
          errors.push({ message: "Email already exists" })
          res.render("register", { errors })
        } else {
          pool.query(
            `INSERT INTO users (username,email,password) VALUES ($1,$2,$3)`,
            [username, email, hashedPassword],
            (err, results) => {
              if (err) {
                throw err
              }
              console.log(results.rows)
              req.flash("success_msg", "Registration Successful,Please Login")
              res.redirect("/login")
            }
          )
        }
      }
    )
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
