// Require Mongoose :
const mongoose = require("mongoose");

// Fuction To Connect Mongo :
const connectDB = async () => {
//   Using Try-Catch :
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo-DB Connected");

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }

};

// Export Module :
module.exports = connectDB;