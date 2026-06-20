// Fuction For Admin Middleware :
exports.adminOnly = (...roles) => {

  return (req, res, next) => {

    // Check Role :
    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        success: false,
        message: "Access denied",
      });

    }

    next();

  };

};