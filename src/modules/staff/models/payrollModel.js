// Require Mongoose :
const mongoose =
    require("mongoose");


    // Function For Payroll Schema :
const payrollSchema =
    new mongoose.Schema(

        {

            staffId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Staff",

                required: true,

            },



            month: {

                type: Number,

                required: true,

            },



            year: {

                type: Number,

                required: true,

            },



            basicSalary: {

                type: Number,

                required: true,

            },



            totalAllowance: {

                type: Number,

                default: 0,

            },



            totalDeduction: {

                type: Number,

                default: 0,

            },



            netSalary: {

                type: Number,

                required: true,

            },



            paymentStatus: {

                type: String,

                enum: [

                    "PENDING",

                    "PAID"

                ],

                default: "PENDING",

            },



            paidDate: {

                type: Date,

            },



            // PROFESSIONAL PAYROLL SLIP NUMBER
            slipNumber: {

                type: String,

            },



            // OPTIONAL NOTES
            remarks: {

                type: String,

            },



            generatedBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Auth",

            },

        },

        {

            timestamps: true,

        }

    );

    // Export Module:
module.exports =
    mongoose.model(
        "Payroll",
        payrollSchema
    );