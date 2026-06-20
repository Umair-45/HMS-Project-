// Require Mongoose :
const mongoose =
    require("mongoose");


    // Function For Allowance Schema :
const allowanceSchema =
    new mongoose.Schema(

        {

            staffId: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Staff",

                required: true,

            },



            allowanceType: {

                type: String,

                enum: [

                    "BONUS",

                    "OVERTIME",

                    "TRANSPORT",

                    "FOOD",

                    "MEDICAL",

                    "NIGHT_DUTY",

                    "EMERGENCY",

                    "ATTENDANCE",

                    "OTHER"

                ],

                required: true,

            },



            amount: {

                type: Number,

                required: true,

            },



            notes: {

                type: String,

            },



            allowanceDate: {

                type: Date,

                default: Date.now,

            },



            month: {

                type: Number,

                required: true,

            },



            year: {

                type: Number,

                required: true,

            },



            addedBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Auth",

            },



            isDeleted: {

                type: Boolean,

                default: false,

            },

        },

        {

            timestamps: true,

        }

    );

    // Export Module :
module.exports =
    mongoose.model(
        "Allowance",
        allowanceSchema
    );