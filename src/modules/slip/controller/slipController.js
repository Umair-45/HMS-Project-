// Require Slip Service :
const slipService = require("../../../../src/modules/slip/service/slipService");

// Require Slip Validations :
const {
  createSlipValidation,
  updateSlipValidation,
} = require("../../../../src/modules/slip/validation/slipValidation");


// Craete Slip :
exports.createSlip = async (req, res) => {

  try {

    const value =
      await createSlipValidation.validateAsync(
        req.body
      );

    const slip =
      await slipService.createSlipService(
        value,
        req.user._id
      );

    return res.status(201).json({
      success: true,
      message: "Slip created successfully",
      data: slip,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Get All Slips :
exports.getAllSlips = async (req, res) => {

  try {

    const slips =
      await slipService.getAllSlipsService(
        req.query
      );

    return res.status(200).json({
      success: true,
      total: slips.length,
      data: slips,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Get  Single Slip By MR Number :
exports.getSlipByMrNumber = async (
  req,
  res
) => {

  try {

    const slip =
      await slipService.getSlipByMrNumberService(
        req.params.mrNumber
      );

    return res.status(200).json({
      success: true,
      data: slip,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// Update Slip :
exports.updateSlip = async (req, res) => {

  try {

    const value =
      await updateSlipValidation.validateAsync(
        req.body
      );

    const slip =
      await slipService.updateSlipService(
        req.params.id,
        value
      );

    return res.status(200).json({
      success: true,
      message: "Slip updated successfully",
      data: slip,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// Soft Delete 
exports.softDeleteSlip = async (
  req,
  res
) => {

  try {

    const slip =
      await slipService.softDeleteSlipService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Slip soft deleted successfully",
      data: slip,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// Permanent Delete :
exports.permanentDeleteSlip = async (
  req,
  res
) => {

  try {

    await slipService.permanentDeleteSlipService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Slip permanently deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Check FBR Connection Status :
exports.checkFbrConnection = async (req, res) => {
  try {
    const fbrUrl = process.env.FBR_API_URL || "http://localhost:8524/api/IMSFiscal/GetInvoiceNumberByModel";
    // Parse base URL for health check (usually http://localhost:8524/api/IMSFiscal/get)
    const urlObj = new URL(fbrUrl);
    const healthCheckUrl = `${urlObj.protocol}//${urlObj.host}/api/IMSFiscal/get`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5 seconds timeout

    const response = await fetch(healthCheckUrl, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const text = await response.text();
    const isResponding = text.includes("Service is responding") || response.ok;

    if (isResponding) {
      return res.status(200).json({
        success: true,
        status: "online",
        message: "FBR Local Service is online and responding."
      });
    }

    throw new Error("Service did not respond with expected status");
  } catch (error) {
    return res.status(200).json({
      success: false,
      status: "offline",
      message: "FBR Local Service is offline or not reachable.",
      error: error.message
    });
  }
};