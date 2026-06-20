// Require Mongoose :
const mongoose = require("mongoose");

// Function For Patient Schema :
const patientSchema = new mongoose.Schema(
    {
        mrNumber: {
            type: String,
            unique: true,
        },

        patientName: {
            type: String,
            required: true,
            trim: true,
        },

        guardianName: {
            type: String,
            trim: true,
        },

        guardianRelation: {
            type: String,
            enum: ["HUSBAND", "FATHER", "MOTHER", "BROTHER", "OTHER"],
            uppercase: true,
            default: "OTHER",
        },

        age: {
            type: Number,
        },

        gender: {
            type: String,
            enum: ["MALE", "FEMALE", "OTHER"],
            uppercase: true,
            default: "FEMALE",
        },

        phone: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            trim: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },

    //   Time Stamps :
    {
        timestamps: true,
    }

);

// Module Export :
module.exports = mongoose.model("Patient", patientSchema);