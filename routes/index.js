const router = require("express").Router()
const bcrypt = require("bcrypt")
const { authenticate } = require("passport")
const passport = require("passport")

const knex = require("../config/database")
const Usermodel = require("../models/user")
const {Register}=require("../controllers/userauth")

// Function to check if a user is already logged in
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
router.post("/register",Register)

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login",
    failureFlash: true,
  })
)
module.exports = router
