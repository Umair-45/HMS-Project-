// Require Express :
const express =
    require("express");

    // Express Mini App :
const router =
    express.Router();

    // Require Staff Controller :
const staffController =
    require(
        "../../../../src/modules/staff/controller/staffController"
    );

    // Require Auth Middleware :
const {
    protect,
} = require(
    "../../../../src/commons/middlewares/authMiddleware"
);

// Require Admin Middleware :
const {
    adminOnly,
} = require(
    "../../../../src/commons/middlewares/adminMiddleware"
);



// ==============================
// STAFF ROUTES
// ==============================

// CREATE STAFF
router.post(
    "/create-staff",
    protect,
    adminOnly("ADMIN"),
    staffController.createStaff
);


// GET ALL STAFF
router.get(
    "/all-staff",
    protect,
    adminOnly("ADMIN"),
    staffController.getAllStaff
);


// GET SINGLE STAFF
router.get(
    "/single-staff/:id",
    protect,
    adminOnly("ADMIN"),
    staffController.getSingleStaff
);


// DELETE STAFF
router.delete(
    "/delete-staff/:id",
    protect,
    adminOnly("ADMIN"),
    staffController.deleteStaff
);



// ==============================
// ALLOWANCE ROUTES
// ==============================

// ADD DAILY ALLOWANCE
router.post(
    "/add-allowance",
    protect,
    adminOnly("ADMIN"),
    staffController.addAllowance
);



// ==============================
// PAYROLL ROUTES
// ==============================

// GENERATE PAYROLL
router.post(
    "/generate-payroll",
    protect,
    adminOnly("ADMIN"),
    staffController.generatePayroll
);


// GET ALL PAYROLLS
router.get(
    "/all-payrolls",
    protect,
    adminOnly("ADMIN"),
    staffController.getPayrolls
);


// MONTHLY SALARY REPORT
router.get(
    "/monthly-salary-report",
    protect,
    adminOnly("ADMIN"),
    staffController.monthlySalaryReport
);


// MARK SALARY PAID
router.patch(
    "/mark-paid/:id",
    protect,
    adminOnly("ADMIN"),
    staffController.markSalaryPaid
);

// Export Module :
module.exports =
    router;