// const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// module.exports.registerUser = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { name, email, password, role } = req.body;

//     // Validate input
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       passwordHash: hashedPassword,
//       role,
//     });

//     const token = jwt.sign(
//       { id: newUser._id, role: newUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports.loginUser = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.passwordHash);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );
//     console.log(token);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });
    
//     res.json({ message: "Login successful", user, token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports.logoutUser = (req, res) => {
//   res.cookie("token", "", {
//     expires: new Date(0),
//     httpOnly: true,
//     secure: true,
//     sameSite: "Strict",
//   });
//   res.json({ message: "Logged out successfully" });
// };

// exports.sendPasswordOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     // Simulate OTP logic
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save or email OTP logic here (for now, just return it)
//     return res.status(200).json({ message: "OTP sent successfully", otp });
//   } catch (err) {
//     return res.status(500).json({ message: "Error sending OTP", error: err.message });
//   }
// };








// Chetana's Corrected Code with OTP Facility

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const otpStore = new Map(); // In-memory store

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
};

// Send OTP
exports.sendPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// Verify OTP
exports.verifyPasswordOtp = (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (storedOtp === otp) {
    res.status(200).json({ message: "OTP verified" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};

// Update password using OTP
exports.updatePasswordWithOtp = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Optionally clean up verified OTP (if still stored)
    otpStore.delete(email);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
