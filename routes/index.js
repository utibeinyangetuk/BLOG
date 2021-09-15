const router = require("express").Router()
const bcrypt = require("bcrypt")
const passport = require("passport")

// TODO move this out too
// require the database file
const knex = require("../config/database")

// check user authentication
const Check = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/account")
  }
  next()
}

// TODO move routes to controller
router.get("/", (req, res, next) => {
  res.render("index", { title: "welcome page" })
})
router.get("/signup", Check, (req, res, next) => {
  res.render("signup", {
    title: "create an account",
  })
})
router.get("/login", Check, (req, res, next) => {
  res.render("login", {
    title: "Log into your account",
  })
})

//TODO move this route to a controller
router.post("/signup", async (req, res) => {
  let { username, email, password, confirm_password } = req.body
  // TODO take out this log
  // console.log({ username, email, password, confirm_password })

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
    res.render("signup", { errors })
  } else {
    // form validation has passed
    let hashedPassword = await bcrypt.hash(password, 10)
    // TODO take this out
    // console.log(hashedPassword)

    await knex("users")
      .whereRaw("email=?", [req.body.email])
      .then((results) => {
        if (results.length > 0) {
          // TODO: Also take this part out
          console.log("if youre seeing this then there is an email error")
          errors.push({ message: "Email is already in use" })
          res.render("signup", { errors })
        } else {
          // TODO: take out this part
          console.log("inserting data....")
          knex("users")
            .insert([
              {
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username,
              },
            ])
            .then((value) => {
              // TODO Remove these logs
              console.log(value)
              console.log("data inserted successfully.")
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

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FIXME: problem dey this route---[when i remove the passport.authenticate,the route works well but when i leave it,it throws a missing credentials error]

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

module.exports = router
