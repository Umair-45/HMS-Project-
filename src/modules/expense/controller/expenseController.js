// Require Expense Services :
const expenseService =
    require(
        "../../../../src/modules/expense/service/expenseService"
    );

// CREATE EXPENSE :
exports.createExpense =
    async (req, res) => {

        try {

            const expense =
                await expenseService.createExpenseService(

                    req.body,

                    req.user.id

                );

            return res.status(201).json({

                success: true,

                message:
                    "Expense Added Successfully",

                data: expense,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// GET ALL EXPENSES :
exports.getAllExpenses =
    async (req, res) => {

        try {

            const expenses =
                await expenseService.getAllExpensesService();

            return res.status(200).json({

                success: true,

                data: expenses,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// GET EXPENSES BY CATEGORY :
exports.getExpensesByCategory =
    async (req, res) => {

        try {

            const expenses =
                await expenseService.getExpensesByCategoryService(

                    req.params.category

                );

            return res.status(200).json({

                success: true,

                data: expenses,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// DELETE EXPENSE :
exports.deleteExpense =
    async (req, res) => {

        try {

            const expense =
                await expenseService.deleteExpenseService(

                    req.params.id

                );

            return res.status(200).json({

                success: true,

                message:
                    "Expense Deleted Successfully",

                data: expense,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// DAILY EXPENSE REPORT :
exports.dailyExpenseReport =
    async (req, res) => {

        try {

            const report =
                await expenseService.dailyExpenseReportService();

            return res.status(200).json({

                success: true,

                data: report,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// MONTHLY EXPENSE REPORT :
exports.monthlyExpenseReport =
    async (req, res) => {

        try {

            const report =
                await expenseService.monthlyExpenseReportService();

            return res.status(200).json({

                success: true,

                data: report,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




// CATEGORY EXPENSE REPORT :
exports.categoryExpenseReport =
    async (req, res) => {

        try {

            const report =
                await expenseService.categoryExpenseReportService();

            return res.status(200).json({

                success: true,

                data: report,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };


    // MONTHLY SALARY EXPENSE REPORT
exports.monthlySalaryExpense =
    async (req, res) => {

        try {

            const result =
                await expenseService
                .monthlySalaryExpenseService(

                    req.query.month,

                    req.query.year

                );

            return res.status(200).json({

                success: true,

                data: result,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };

    // PROFIT LOSS REPORT
exports.profitLossReport =
    async (req, res) => {

        try {

            const report =
                await expenseService
                .profitLossReportService();

            return res.status(200).json({

                success: true,

                data: report,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };




    // DAILY PROFIT LOSS REPORT
exports.dailyProfitLossReport =
    async (req, res) => {

        try {

            const report =
                await expenseService
                .dailyProfitLossReportService();

            return res.status(200).json({

                success: true,

                data: report,

            });

        }

        catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };