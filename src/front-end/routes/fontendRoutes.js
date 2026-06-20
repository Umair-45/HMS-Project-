// REQUIRE EXPRESS :
const express = require("express");

const router = express.Router();


// LOGIN PAGE :
router.get(
  "/",
  (req, res) => {

    res.render("auth/login");

  }
);


// DASHBOARD :
router.get(
  "/dashboard",
  (req, res) => {

    res.render(
      "dashboard/dashboard"
    );

  }
);


// REGISTER PATIENT :
router.get(
  "/register-patient",
  (req, res) => {

    res.render(
      "patient/registerPatient"
    );

  }
);

// CREATE SLIP PAGE
router.get(
  "/create-slip",

  (req, res) => {

    res.render(
      "slip/createSlip",
      { fbrPosId: process.env.FBR_POS_ID || "194518" }
    );

  }
);

// REPORTS PAGE :
router.get(
  "/reports",
  (req, res) => {

    res.render(
      "reports/reports"
    );

  }
);

// EXPENSE PAGE :
router.get(
  "/expenses",
  (req, res) => {

    res.render(
      "expense/expense"
    );

  }
);

// STAFF PAGE :
router.get(
  "/staff",
  (req, res) => {

    res.render(
      "staff/staff"
    );

  }
);



// Export Router :
module.exports = router;