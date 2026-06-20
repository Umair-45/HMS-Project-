// Require Express
const express = require("express");

// Express Mini App :
const router = express.Router();


// Require Reports Controller
const reportsController =
require("../controller/reportsController");


// Require Auth Middleware
const {
    protect,
} = require("../../../commons/middlewares/authMiddleware");


// Require Admin Middleware
const {
    adminOnly,
} = require("../../../commons/middlewares/adminMiddleware");




// DAILY INCOME
router.get(
    "/daily-income",
    protect,
    adminOnly("ADMIN"),
    reportsController.dailyIncomeReport
);


// MONTHLY INCOME
router.get(
    "/monthly-income",
    protect,
    adminOnly("ADMIN"),
    reportsController.monthlyIncomeReport
);


// DAILY SLIPS
router.get(
    "/daily-slips",
    protect,
    adminOnly("ADMIN"),
    reportsController.dailyTotalSlipsReport
);


// MONTHLY SLIPS
router.get(
    "/monthly-slips",
    protect,
    adminOnly("ADMIN"),
    reportsController.monthlyTotalSlipsReport
);


// DAILY PATIENTS
router.get(
    "/daily-patients",
    protect,
    adminOnly("ADMIN"),
    reportsController.dailyPatientsReport
);


// MONTHLY PATIENTS
router.get(
    "/monthly-patients",
    protect,
    adminOnly("ADMIN"),
    reportsController.monthlyPatientsReport
);


// DAILY SLIP TYPES
router.get(
    "/daily-slip-types",
    protect,
    adminOnly("ADMIN"),
    reportsController.dailySlipTypeReport
);


// MONTHLY SLIP TYPES
router.get(
    "/monthly-slip-types",
    protect,
    adminOnly("ADMIN"),
    reportsController.monthlySlipTypeReport
);


// DAILY OPERATORS
router.get(
    "/daily-operators",
    protect,
    adminOnly("ADMIN"),
    reportsController.dailyOperatorReport
);


// MONTHLY OPERATORS
router.get(
    "/monthly-operators",
    protect,
    adminOnly("ADMIN"),
    reportsController.monthlyOperatorReport
);


// PATIENT HISTORY
router.get(
    "/history/:mrNumber",
    protect,
    adminOnly("ADMIN"),
    reportsController.patientHistoryReport
);


// EXPORT ROUTER
module.exports = router;