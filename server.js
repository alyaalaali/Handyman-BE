// imports
const express = require("express")
require("dotenv").config()
const session = require("express-session")
const path = require("path")
const cors = require("cors")
const userRouter = require("./routes/userRouter")
const requestRouter = require("./routes/requestRouter")
// Initialize app
const app = express()

// Database Configuration
const mongoose = require("./config/db")

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const morgan = require("morgan")

// Require passUserToView & isSignedIn middlewares

// use MiddleWares
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

// Root Route
app.get("/", (req, res) => {
  res.send("Your app is connected . . . ")
})

// use Routers
app.use("/user", userRouter)
app.use("/request", requestRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
