// Require Staff Service :
const staffService =
    require(
        "../../../../src/modules/staff/service/staffService"
    );

// CREATE STAFF :
exports.createStaff =
    async (req, res) => {

        try {

            const result =
                await staffService
                .createStaffService(

                    req.body,

                    req.user._id

                );

            res.status(201).json({

                success: true,

                message:
                    "Staff created successfully",

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };

    // GET SINGLE STAFF
exports.getSingleStaff =
    async (req, res) => {

        try {

            const result =
                await staffService
                .getSingleStaffService(

                    req.params.id

                );

            res.status(200).json({

                success: true,

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };


// GET ALL STAFF :
exports.getAllStaff =
    async (req, res) => {

        try {

            const result =
                await staffService
                .getAllStaffService();

            res.status(200).json({

                success: true,

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };

// DELETE STAFF :
exports.deleteStaff =
    async (req, res) => {

        try {

            const result =
                await staffService
                .deleteStaffService(

                    req.params.id

                );

            res.status(200).json({

                success: true,

                message:
                    "Staff deleted",

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };


// MARK SALARY PAID
exports.markSalaryPaid =
    async (req, res) => {

        try {

            const result =
                await staffService
                .markSalaryPaidService(

                    req.params.id

                );

            res.status(200).json({

                success: true,

                message:
                    "Salary marked paid",

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };


// ADD ALLOWANCE :
exports.addAllowance =
    async (req, res) => {

        try {

            const result =
                await staffService
                .addAllowanceService(

                    req.body,

                  req.user._id

                );

            res.status(201).json({

                success: true,

                message:
                    "Allowance added",

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };


// GENERATE PAYROLL :
exports.generatePayroll =
    async (req, res) => {

        try {

            const result =
                await staffService
                .generatePayrollService(

                    req.body.staffId,

                    req.body.month,

                    req.body.year,

                    req.user._id,

                    req.body.deduction

                );

            res.status(201).json({

                success: true,

                message:
                    "Payroll generated",

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };

// GET PAYROLLS :
exports.getPayrolls =
    async (req, res) => {

        try {

            const result =
                await staffService
                .getPayrollsService();

            res.status(200).json({

                success: true,

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };


// MONTHLY REPORT
exports.monthlySalaryReport =
    async (req, res) => {

        try {

            const result =
                await staffService
                .monthlySalaryReportService(

                    req.query.month,

                    req.query.year

                );

            res.status(200).json({

                success: true,

                data: result,

            });

        }

        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message,

            });

        }

    };