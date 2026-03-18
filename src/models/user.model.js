const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})


/*
==================================================
TASK 1 – Secure Password Hashing (bcrypt)
==================================================

Before saving a user, the password must be hashed.

Requirements:

1. Import bcryptjs
2. Use mongoose pre("save") hook
3. Hash password only if it has been modified
4. Use 10 salt rounds

*/

// TODO: Implement bcrypt password hashing here


const User = mongoose.model("User", userSchema)

module.exports = User
