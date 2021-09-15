const localstrategy = require("passport-local").Strategy
const knex = require("../config/database")
const bcrypt = require("bcrypt")

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    await knex("users")
      .whereRaw("email=?", [email])
      .then((results) => {
        console.log(results.rows)
        if (results.rows.length > 0) {
          const user = results.rows[0]
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err
            }
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, {
                message: "Password is incorrect",
              })
            }
          })
        } else {
          return done(null, false, {
            message: "Email does not exist",
          })
        }
      })
      .catch((err) => {
        throw err
      })
  }
  passport.use(
    new localstrategy(
      {
        usernamefield: "email",
        passwordfield: "password",
      },
      authenticateUser
    )
  )
  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser(async (id, done) => {
    await knex("users")
      .whereRaw("id=?", [id])
      .then((results) => {
        return done(null, results.rows[0])
      })
      .catch((err) => {
        throw err
      })
  })
}
module.exports = initialize
