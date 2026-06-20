// Require Mongoose :
const mongoose =
    require("mongoose");

// Expense Schema :
const expenseSchema =
    new mongoose.Schema(

        {

            category: {

                type: String,

                enum: [

                    "DOCTOR_PAYMENT",

                    "ANESTHETIC_PAYMENT",

                    "UTILITY_BILLS",

                    "KITCHEN_PAYMENT",

                    "HOME_EXPENSE",

                    "MEDICAL_STORE_BILLS",

                    "SURGICAL_MATERIAL",

                    "BUILDING_REPAIR",

                    "MONTHLY_SALARY",

                    "EXCISE_TAX",

                    "INCOME_TAX",

                    "CONTONMENT_TAX",

                    "HEALTH_CARE_COMMISSION",

                    "EQUIPMENT_REPAIR",

                    "WASTE_MANAGEMENT",

                    "NURSERY_PAYMENT",

                    "POOR_PATIENT_DISCOUNT",

                    "MISCELLANEOUS"

                ],

                required: true,

            },

            deletedBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Auth",

                default: null,

            },


            deletedAt: {

                type: Date,

                default: null,

            },



            amount: {

                type: Number,

                required: true,

            },


            description: {

                type: String,

                trim: true,

            },


            expenseDate: {

                type: Date,

                default: Date.now,

            },


            createdBy: {

                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "Auth",

                required: true,

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


// Export Model :
module.exports =
    mongoose.model(
        "Expense",
        expenseSchema
    );

