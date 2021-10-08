require("dotenv").config()
const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const flash = require("express-flash")
const passport = require("passport")

const initializePassport = require("./config/passportconfig")
initializePassport(passport)

// Import route files
const indexRouter = require("./routes/index")
const accountRouter = require("./routes/account")

// Initialize express
const app = express()
const PORT = process.env.PORT || 5000

// view engine setup(handlebars)
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main",
})
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")

// setting up all middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"))
app.use(
  session({ secret: "somesecretkey", resave: false, saveUninitialized: false })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// routes
app.use("/", indexRouter)
app.use("/account", accountRouter)


// TODO: uncomment this part out 
// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404))
// })

// // error handler
// app.use( (err, req, res, next)=> {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get("env") === "development" ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render("error")
// })

// starting the server
app.listen(PORT, () => {
  console.log(`> server running on http://localhost:${PORT}`)
})
