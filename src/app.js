// Require Express :
const express = require("express");

// Require Path :
const path = require("path");


// Routes :
const authRoutes =
  require("./modules/auth/routes/authRoutes");

const patientRoutes =
  require("./modules/patient/routes/patientRoutes");

const slipRoutes =
  require("./modules/slip/routes/slipRoutes");

const reportsRoutes =
  require("./modules/reports/routes/reportsRoutes");

const expenseRoutes =
  require('./modules/expense/routes/expenseRoutes');

const staffRoutes =
  require('./modules/staff/routes/staffRoutes');

const frontendRoutes =
  require("./front-end/routes/fontendRoutes");


// Create Server :
const app = express();


// Body Parser :
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// EJS Setup :
app.set(
  "view engine",
  "ejs"
);

app.set(
  "views",

  path.join(
    __dirname,
    "front-end/views"
  )
);


// Static Files :
app.use(

  express.static(

    path.join(
      __dirname,
      "front-end/public"
    )

  )

);


// API Routes :
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/patient",
  patientRoutes
);

app.use(
  "/api/slip",
  slipRoutes
);

app.use(
  "/api/reports",
  reportsRoutes
);

app.use(
  "/api/expense",
  expenseRoutes
);

app.use(
  "/api/staff",
  staffRoutes
);

// Frontend Routes :
app.use("/", frontendRoutes);


// Export Module :
module.exports = app;