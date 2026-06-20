// Require Express :
const express = require("express");

// Mini Express App :
const router = express.Router();

// Require Auth Controller :
const authController = require("../../../../src/modules/auth/controller/authController");

// Require AuthMiddleware :
const { protect } = require("../../../../src/commons/middlewares/authMiddleware");

// Require AdminMiddleware :
const {adminOnly} = require("../../../../src/commons/middlewares/adminMiddleware");

// PUBLIC ROUTES
router.post("/login", authController.loginUser);

router.get("/profile", protect, authController.getProfile);

// PROTECTED ROUTES
router.post("/register",protect,adminOnly("ADMIN"), authController.registerUser);

router.get("/getAllUsers", protect, adminOnly("ADMIN"),authController.getAllUsers);

router.get("/getSingleUser/:id", protect, adminOnly("ADMIN"),authController.getSingleUser);

router.delete("/deleteUser/:id", protect,adminOnly("ADMIN"), authController.deleteUser);

router.patch("/blockUser/:id", protect,adminOnly("ADMIN"), authController.blockUser);

router.patch("/unblockUser/:id", protect,adminOnly("ADMIN"), authController.unblockUser);

// Export Router :
module.exports = router;