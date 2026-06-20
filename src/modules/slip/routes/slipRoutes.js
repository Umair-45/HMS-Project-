// Require Express :
const express = require("express");

// Express Mini App :
const router = express.Router();

// Require Slip Controller :
const slipController = require("../../../../src/modules/slip/controller/slipController");

// Require Auth Middleware :
const {
  protect,
} = require("../../../../src/commons/middlewares/authMiddleware");

// Require Admin Middleware :
const {
  adminOnly,
} = require("../../../../src/commons/middlewares/adminMiddleware");

// Require Slip Middleware :
const {
  checkSlipAccess,
} = require("../../../../src/commons/middlewares/slipAccessMiddleware");


// Create Slip Route :
router.post(
  "/createSlip",
  protect,
  checkSlipAccess,
  slipController.createSlip
);

// Check FBR Connection Route :
router.get(
  "/check-fbr",
  protect,
  slipController.checkFbrConnection
);

// Get All Slips Route :
router.get(
  "/getAllSlips",
  protect,
  slipController.getAllSlips
);

// Get Single Slip Route :
router.get(
  "/getSingleSlipByMR/:mrNumber",
  protect,
  slipController.getSlipByMrNumber
);

// Update Slip Route :
router.patch(
  "/updateSlip/:id",
  protect,
  adminOnly("ADMIN"),
  slipController.updateSlip
);

// Soft Delete Slip Route :
router.patch(
  "/soft-delete/:id",
  protect,
  adminOnly("ADMIN"),
  slipController.softDeleteSlip
);

// Permanently Delete Slip Route :
router.delete(
  "/deleteSlip/:id",
  protect,
  adminOnly("ADMIN"),
  slipController.permanentDeleteSlip
);

// Export Module :
module.exports = router;