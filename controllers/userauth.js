const bcrypt = require("bcrypt")
const Usermodel = require("../models/user")

module.exports = {
  Register: async (req, res) => {
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
     await Usermodel.select()
        .then((results) => {
          if (results.rows > 0) {
            errors.push({ message: "User already exist" })
            res.render("register", { errors })
          } else {
            Usermodel.insert([
              {
                username: username,
                email: email,
                password: hashedPassword,
              },
            ])
              .then(() => {
                req.flash("success_msg", "Registration successful,please login")
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
  },
}
