// Require Joi :
const Joi = require("joi");

// Require Constants :
const {
  SLIP_TYPES,
  PAYMENT_STATUS,
} = require("../../../../src/modules/slip/constants/slipTypes");


// Create Slip Validation :
exports.createSlipValidation =
  Joi.object({

    mrNumber: Joi.string()
      .required(),

    slipType: Joi.string()

      .valid(
        ...Object.values(SLIP_TYPES)
      )

      .required(),

    doctorName: Joi.string()
      .allow("", null),

    amount: Joi.number()
      .default(0),

    paymentStatus: Joi.string()

      .valid(
        ...Object.values(PAYMENT_STATUS)
      )

      .default(
        PAYMENT_STATUS.UNPAID
      ),

    selectedOption: Joi.string()
      .allow("", null),
  });


// Update Slip Validation :
exports.updateSlipValidation =
  Joi.object({

    doctorName: Joi.string()
      .allow("", null),

    amount: Joi.number(),

    paymentStatus: Joi.string()

      .valid(
        ...Object.values(PAYMENT_STATUS)
      ),

  });