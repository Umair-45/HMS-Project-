// Require Mongoose :
const mongoose = require("mongoose");

// Require Slip Types And Payment Status :
const {
  SLIP_TYPES,
  PAYMENT_STATUS,
} = require("../../../../src/modules/slip/constants/slipTypes");

// Function For Slip Schema :
const slipSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    mrNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slipType: {
      type: String,
      enum: Object.values(SLIP_TYPES),
      required: true,
    },

    doctorName: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.UNPAID,
    },

    selectedOption: {
      type: String,
      default: "",
    },

    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    fbrInvoiceNumber: {
      type: String,
      default: "",
    },

    fbrStatus: {
      type: String,
      default: "",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }

);

// Export Module :
module.exports = mongoose.model(
  "Slip",
  slipSchema
);