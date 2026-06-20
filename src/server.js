// Require Dot Env :
require("dotenv").config();

// Require App :
const app = require("./app");

// Require Config Function :
const connectDB = require("../src/config/db");

// Require Admin Seed :
const seedAdmin = require("../src/commons/seeder/adminSeed");

// Function To Start Server :
const startServer = async () => {
  try {
    // CONNECT DB
    await connectDB();

    // RUN SEEDER
    await seedAdmin();

    // START SERVER
    const PORT = process.env.PORT || 5000;

    app.listen(PORT,"0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error.message);
  }
};

// Export Module :
startServer();