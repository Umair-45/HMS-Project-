// Require Mongoose :
const mongoose =
    require("mongoose");

    // Function For Staff Schema :
const staffSchema =
    new mongoose.Schema(

        {

            fullName: {

                type: String,

                required: true,

                trim: true,

            },



            designation: {

                type: String,

                required: true,

            },



            department: {

                type: String,

                required: true,

            },



            basicSalary: {

                type: Number,

                required: true,

            },



            phone: {

                type: String,

            },



            address: {

                type: String,

            },



            isActive: {

                type: Boolean,

                default: true,

            },



            isDeleted: {

                type: Boolean,

                default: false,

            },



            createdBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Auth",

            },

        },

        {

            timestamps: true,

        }

    );

    // Export Module :
module.exports =
    mongoose.model(
        "Staff",
        staffSchema
    );