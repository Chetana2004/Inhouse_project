// const express = require('express');
// const user = require('../models/user.model');
// const router = express.Router();
// const userController = require("../controllers/auth.controller");
// const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// console.log("in routes");
// router.post("/login", userController.loginUser);
// router.post("/register", userController.registerUser);
// router.get("/logout", userController.logoutUser);

// module.exports = router;






// Chetana's Corrected Code with OTP Facility

const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

console.log("in routes");

// Authentication routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

// OTP-based password recovery
router.post("/send-password-otp", userController.sendPasswordOtp);
router.post("/verify-password-otp", userController.verifyPasswordOtp);
router.post("/update-password-with-otp", userController.updatePasswordWithOtp);

// Get current user data (protected route)
router.get("/me",authMiddleware.roleMiddleware, userController.getCurrentUser);

module.exports = router;
