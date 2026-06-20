// Require Express :
const express = require("express");

// Mini Express App :
const router = express.Router();

// Require Patient Controller :
const patientController = require("../../../../src/modules/patient/controller/patientController");

// Require Auth Middleware :
const {
    protect,
} = require("../../../../src/commons/middlewares/authMiddleware");

// Require Admin Middleware :
const {
    adminOnly,
} = require("../../../../src/commons/middlewares/adminMiddleware");


// Register Route :
router.post(
    "/register",
    protect,
    patientController.createPatient
);

// Get All Patients Route :
router.get(
    "/getAllPatients",
    protect,
    patientController.getAllPatients
);

// Get Single Patient Route :
router.get(
    "/getSinglePatient/:mrNumber",
    protect,
    patientController.getPatientByMr
);

// Update Patient Route (ADMIN ONLY) :
router.patch(
    "/updatePatient/:mrNumber",
    protect,
    adminOnly("ADMIN"),
    patientController.updatePatient
);

// Patient Soft Delete Route (ADMIN ONLY) :
router.patch(
    "/soft-delete/:mrNumber",
    protect,
    adminOnly("ADMIN"),
    patientController.softDeletePatient
);

// Patient Permanent Delete (ADMIN ONLY) :
router.delete(
    "/deletePatient/:mrNumber",
    protect,
    adminOnly("ADMIN"),
    patientController.permanentDeletePatient
);

// Module Export :
module.exports = router;