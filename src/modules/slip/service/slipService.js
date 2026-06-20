// Require Slip Model :
const Slip = require("../../../../src/modules/slip/model/slipModel");

// Require Patient Model :
const Patient = require("../../../../src/modules/patient/model/patientModel");

// Require FBR Client :
const { sendInvoiceToFBR } = require("../../../../src/utils/fbrClient");


// Logic For Create Slip :
exports.createSlipService = async (
  payload,
  userId
) => {

  // Check Patient By MR Number :
  const patient = await Patient.findOne({

    mrNumber: payload.mrNumber,

    isDeleted: false,

  });

  // Patient Not Found :
  if (!patient) {

    throw new Error(
      "Patient not found"
    );

  }

  // Create Slip :
  const slip = await Slip.create({

    patient: patient._id,

    patientName:
      patient.patientName,

    mrNumber:
      patient.mrNumber,

    address:
      patient.address || "",

    slipType:
      payload.slipType,

    doctorName:
      payload.doctorName,

    amount:
      payload.amount,

    paymentStatus:
      payload.paymentStatus,

    selectedOption:
      payload.selectedOption || "",

    registeredBy:
      userId,

  });

  // Send to FBR
  try {
    const fbrResult = await sendInvoiceToFBR(slip);
    if (fbrResult.success) {
      slip.fbrInvoiceNumber = fbrResult.fbrInvoiceNumber;
      slip.fbrStatus = "Success";
      await Slip.findByIdAndUpdate(slip._id, {
        fbrInvoiceNumber: fbrResult.fbrInvoiceNumber,
        fbrStatus: "Success"
      });
    } else {
      slip.fbrStatus = "Failed";
      await Slip.findByIdAndUpdate(slip._id, {
        fbrStatus: "Failed"
      });
    }
  } catch (err) {
    console.error("[Slip Service] FBR Integration failed:", err.message);
  }

  // RETURN COMPLETE SLIP
  const createdSlip =
    await Slip.findById(slip._id)

      .populate("patient");

  return createdSlip;

}; // <= YEH MISSING THA



// Logic For Get All Slips :
exports.getAllSlipsService =
  async (query) => {

    const filters = {

      isDeleted: false,

    };

    // Filter By Slip Type :
    if (query.slipType) {

      filters.slipType =
        query.slipType;

    }

    // Filter By Payment :
    if (query.paymentStatus) {

      filters.paymentStatus =
        query.paymentStatus;

    }

    // Filter By MR Number :
    if (query.mrNumber) {

      filters.mrNumber =
        query.mrNumber;

    }

    // Get Slips :
    return await Slip.find(filters)

      .populate(
        "registeredBy",
        "username role"
      )

      .sort({
        createdAt: -1,
      });

  };


// Logic For Get Slip By MR Number :
exports.getSlipByMrNumberService =
  async (mrNumber) => {

    return await Slip.find({

      mrNumber: mrNumber,

      isDeleted: false,

    })

      .populate(
        "registeredBy",
        "username role"
      )

      .sort({
        createdAt: -1,
      });

  };


// Logic For Get Single Slip :
exports.getSingleSlipService =
  async (id) => {

    return await Slip.findOne({

      _id: id,

      isDeleted: false,

    })

      .populate(
        "registeredBy",
        "username role"
      );

  };


// Logic For Update Slip :
exports.updateSlipService =
  async (id, payload) => {

    return await Slip.findOneAndUpdate(

      {

        _id: id,

        isDeleted: false,

      },

      payload,

      {

        new: true,

      }

    );

  };


// Logic For Soft Delete Slip :
exports.softDeleteSlipService =
  async (id) => {

    return await Slip.findByIdAndUpdate(

      id,

      {

        isDeleted: true,

        deletedAt: new Date(),

      },

      {

        new: true,

      }

    );

  };


// Logic For Permanent Delete Slip :
exports.permanentDeleteSlipService =
  async (id) => {

    return await Slip.findByIdAndDelete(
      id
    );

  };