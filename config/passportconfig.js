const Localstrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: "5432",
})

const initialize = (passport) => {
  const authenticateuser = (email, password, done) => {
    pool.query(
      `select * from users where email=$1`,
      [email],
      (err, results) => {
        if (err) {
          throw err
        }
        if (results.rows.length > 0) {
          const user = results.rows[0]
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err
            }
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Password is incorrect." })
            }
          })
        } else {
          return done(null, false, { message: "Email does not exist." })
        }
      }
    )
  }
  passport.use(
    new Localstrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateuser
    )
  )
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    pool.query(`select * from users where id=$1`, [id], (err, results) => {
      if (err) {
        throw err
      } else {
        return done(null, results.rows[0])
      }
    })
  })
}

module.exports = initialize
