require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const { registerUser, loginUser } = require("./controllers/auth.controller")

const app = express()

app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))

// Routes
app.post("/api/auth/register", registerUser)
app.post("/api/auth/login", loginUser)

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
