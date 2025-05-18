// const jwt = require("jsonwebtoken");

// // ✅ Middleware to check if the user is authenticated
// module.exports.authMiddleware = (req, res, next) => {
//     console.log("cookies = ",req.cookies.token);
//   let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
//   if (token && token.startsWith('"') && token.endsWith('"')) {
//     token = token.slice(1, -1);
//   }
//   console.log(token);
//   if (!token) return res.status(401).json({ message: "Unauthorized access" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return res.status(403).json({ message: "Invalid token" });
//     } else if (error.name === "TokenExpiredError") {
//       return res.status(403).json({ message: "Token has expired" });
//     } else if (error.name === "NotBeforeError") {
//       return res.status(403).json({ message: "Token not active" });
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Middleware to restrict access based on roles
// module.exports.roleMiddleware = (roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) {
//     return res.status(403).json({ message: "Access denied. Insufficient permissions." });
//   }
//   next();
// };








const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Adjust path based on your folder structure

// ✅ Middleware to check if the user is authenticated
module.exports.authMiddleware = async (req, res, next) => {
  console.log("cookies = ", req.cookies.token);

  let token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Optional: fallback to cookie
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }

  console.log("Final token:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch full user from the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    console.error("Auth error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    } else if (error.name === "NotBeforeError") {
      return res.status(403).json({ message: "Token not active" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Middleware to restrict access based on roles
module.exports.roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
  }
  next();
};
