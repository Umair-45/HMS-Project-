// Require Jwt :
const jwt = require("jsonwebtoken");

// Require Auth Model :
const Auth = require("../../../src/modules/auth/model/authModel");

// Function For Auth Middleware :
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get Token :
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check Token :
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Verify Token :
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User :
    const user = await Auth.findById(decoded.id).select("-password");

    // Using If :
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check If User Is Block :
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "User is blocked",
      });
    }
  
    // Set User And Call Next :
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
  
};