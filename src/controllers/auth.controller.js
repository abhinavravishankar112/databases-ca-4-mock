const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// ===========================
// REGISTER USER
// ===========================

exports.registerUser = async (req, res) => {

  try {

    const { username, email, password } = req.body

    const user = new User({
      username,
      email,
      password
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    })

  }

}


/*
==================================================
TASK 2 – JWT Login Authentication
==================================================

Steps:

1. Find user by email
2. Compare password using bcrypt.compare()
3. Create JWT payload with id and username
4. Generate token using jwt.sign()
5. Return response with token and user data

*/

exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }

    // =========================
    // TODO: Compare password
    // =========================
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      })
    }
    // =========================
    // TODO: Create payload
    // =========================
    const payload = {
      id: user._id,
      username: user.username
    };
    // =========================
    // TODO: Generate JWT token
    // =========================
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );

    // =========================
    // TODO: Send response
    // =========================
    res.status(200).json({
      success: true,
      data: {
        token,
        user: payload
      }
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    })

  }

}
