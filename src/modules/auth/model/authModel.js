// Require Mongoose :
const mongoose = require("mongoose");

// Require Slip Types :
const {
  SLIP_TYPES,
} = require("../../../../src/modules/slip/constants/slipTypes");



// Schema :
const authSchema = new mongoose.Schema(

  {

    // USERNAME
    username: {
      type: String,

      required: true,

      unique: true,

      trim: true,
    },



    // PASSWORD
    password: {
      type: String,

      required: true,
    },



    // ROLE
    role: {
      type: String,

      enum: [
        "ADMIN",
        "OPERATOR",
      ],

      default: "OPERATOR",
    },



    // Allowed Slip Types :
    allowedSlipTypes: [

      {
        type: String,

        enum:
          Object.values(SLIP_TYPES),
      },

    ],



    // Block User :
    isBlocked: {
      type: Boolean,

      default: false,
    },

  },

  // Time Stamps :
  {
    timestamps: true,
  }

);

// Export Model :
module.exports = mongoose.model(
  "Auth",
  authSchema
);