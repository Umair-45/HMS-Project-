// Require Mongoose :
const mongoose = require('mongoose');

// Require Staff Model :
const Staff =
    require("../../../../src/modules/staff/models/staffModel");

// Require Allowance Model :
const Allowance =
    require("../../../../src/modules/staff/models/allowanceModel");

// Require Payroll Model :
const Payroll =
    require("../../../../src/modules/staff/models/payrollModel");


// LOGIC FOR CREATE STAFF
exports.createStaffService =
    async (data, userId) => {

        return await Staff.create({

            fullName:
                data.fullName,

            designation:
                data.designation,

            department:
                data.department,

            basicSalary:
                Number(data.basicSalary),

            phone:
                data.phone,

            address:
                data.address,

            createdBy:
                new mongoose.Types.ObjectId(userId),

        });

    };

// LOGIC FOR GET ALL STAFF
exports.getAllStaffService =
    async () => {

        return await Staff.find({

            isDeleted: false,

        })

            .sort({
                createdAt: -1
            });

    };

// LOGIC FOR GET SINGLE STAFF
exports.getSingleStaffService =
    async (id) => {

        const staff =
            await Staff.findOne({

                _id: id,

                isDeleted: false,

            });

        if (!staff) {

            throw new Error(
                "Staff not found"
            );

        }

        return staff;

    };

// LOGIC FOR DELETE STAFF
exports.deleteStaffService =
    async (id) => {

        const staff =
            await Staff.findByIdAndUpdate(

                id,

                {
                    isDeleted: true,
                    isActive: false,
                },

                {
                   returnDocument: "after",
                }

            );

        if (!staff) {

            throw new Error(
                "Staff not found"
            );

        }

        return staff;

    };


// LOGIC FOR DELETE COMPLETE MODULE
exports.deleteAllStaffService =
    async () => {

        await Staff.deleteMany({});

        await Allowance.deleteMany({});

        await Payroll.deleteMany({});

        return true;

    };

// LOGIC FOR ADD DAILY ALLOWANCE
exports.addAllowanceService =
    async (data, userId) => {

        console.log("ALLOWANCE DATA => ", data);

        const staff =
            await Staff.findById(
                data.staffId
            );

        if (!staff) {

            throw new Error(
                "Staff not found"
            );

        }

        return await Allowance.create({

            staffId:
                data.staffId,

            allowanceType:
                data.allowanceType,

            amount:
                Number(data.amount),

            notes:
                data.notes,

            month:
                Number(data.month),

            year:
                Number(data.year),

            addedBy:
                new mongoose.Types.ObjectId(userId),

        });

    };


// LOGIC FOR Generate Payroll Service :
exports.generatePayrollService =
    async (
        staffId,
        month,
        year,
        userId,
        deduction = 0
    ) => {

        // FIX NUMBER CONVERSION
        month = Number(month);
        year = Number(year);

        const staff =
            await Staff.findOne({

                _id: staffId,

                isDeleted: false,

            });

        if (!staff) {

            throw new Error(
                "Staff not found"
            );

        }



        // CHECK EXISTING PAYROLL
        const existingPayroll =
            await Payroll.findOne({

                staffId,
                month,
                year,

            });

        if (existingPayroll) {

            await Payroll.findByIdAndDelete(
                existingPayroll._id
            );

        }


        // GET ALLOWANCES
        const allowances =
            await Allowance.find({

                staffId,

                month,

                year,

                isDeleted: false,

            });

        console.log("STAFF ID =>", staffId);
        console.log("MONTH =>", month);
        console.log("YEAR =>", year);
        console.log("ALLOWANCES => ", allowances);



        // TOTAL ALLOWANCE
        let totalAllowance = 0;

        allowances.forEach((item) => {

            totalAllowance += Number(item.amount);

        });



        // DEDUCTIONS
        let totalDeduction = Number(deduction) || 0;



        // NET SALARY
        const netSalary =

            Number(staff.basicSalary)

            +

            Number(totalAllowance)

            -

            Number(totalDeduction);

        // CREATE PAYROLL
        return await Payroll.create({

            staffId,

            month,

            year,

            basicSalary:
                Number(staff.basicSalary),

            totalAllowance:
                Number(totalAllowance),

            totalDeduction:
                Number(totalDeduction),

            netSalary:
                Number(netSalary),

            generatedBy:
                new mongoose.Types.ObjectId(userId),

        });

    };

// LOGIC FOR GET ALL PAYROLLS
exports.getPayrollsService =
    async () => {

        const payrolls =

            await Payroll.find()

                .populate(

                    "staffId",

                    `
                    fullName
                    designation
                    department
                    phone
                    isDeleted
                    `
                )

                .populate(

                    "generatedBy",

                    `
                    username
                    role
                    `
                )

                .sort({
                    createdAt: -1
                });



        // HIDE DELETED STAFF
        const filteredPayrolls =

            payrolls.filter((item) => {

                return (

                    item.staffId &&

                    item.staffId.isDeleted === false

                );

            });

        return filteredPayrolls;

    };

// LOGIC FOR MARK SALARY PAID
exports.markSalaryPaidService =
    async (id) => {

        const payroll =
            await Payroll.findByIdAndUpdate(

                id,

                {

                    paymentStatus:
                        "PAID",

                    paidDate:
                        new Date(),

                },

                {
                    returnDocument: "after",
                }

            );

        if (!payroll) {

            throw new Error(
                "Payroll not found"
            );

        }

        return payroll;

    };

// LOGIC FOR MONTHLY SALARY REPORT
exports.monthlySalaryReportService =
    async (month, year) => {

        const payrolls =
            await Payroll.find({

                month: Number(month),

                year: Number(year),

            })

                .populate(

                    "staffId",

                    `
                    fullName
                    designation
                    department
                    isDeleted
                    `
                );



        // HIDE DELETED STAFF
        const filteredPayrolls =

            payrolls.filter((item) => {

                return (

                    item.staffId &&

                    item.staffId.isDeleted === false

                );

            });



        let totalSalary = 0;

        let totalAllowance = 0;

        let totalDeduction = 0;

        let totalNetSalary = 0;



        filteredPayrolls.forEach((item) => {

            totalSalary +=
                item.basicSalary;

            totalAllowance +=
                item.totalAllowance;

            totalDeduction +=
                (item.totalDeduction || 0);

            totalNetSalary +=
                item.netSalary;

        });



        return {

            totalEmployees:
                filteredPayrolls.length,

            totalSalary,

            totalAllowance,

            totalDeduction,

            totalNetSalary,

            payrolls:
                filteredPayrolls,

        };

    };