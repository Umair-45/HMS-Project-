// Function For Slip Access Middleware :
exports.checkSlipAccess = (
  req,
  res,
  next
) => {

  const slipType = req.body.slipType;

  // Admin Full Access :
  if (req.user.role === "ADMIN") {
    return next();
  }

  // Check Access :
  if (
    !req.user.allowedSlipTypes.includes(
      slipType
    )
  ) {

    return res.status(403).json({
      success: false,
      message: `Access denied for ${slipType}`,
    });

  }

  next();

};