// Require Models :
const Expense =
    require("../../../../src/modules/expense/model/expenseModel");

const Payroll =
    require("../../../../src/modules/staff/models/payrollModel");

const Slip =
    require("../../../../src/modules/slip/model/slipModel");

const Staff =
    require("../../../../src/modules/staff/models/staffModel");



// LOGIC FOR CREATE EXPENSE :
exports.createExpenseService =
    async (data, userId) => {

        const expense =
            await Expense.create({

                category:
                    data.category,

                amount:
                    Number(data.amount),

                description:
                    data.description,


                expenseDate:
                    data.expenseDate || new Date(),

                createdBy:
                    userId,

            });

        return expense;

    };




// LOGIC FOR GET ALL EXPENSES :
exports.getAllExpensesService =
    async () => {

        return await Expense.find({

            isDeleted: false,

        })

            .populate(
                "createdBy",
                "username role"
            )

            .sort({
                createdAt: -1,
            });

    };




// LOGIC FOR GET EXPENSES BY CATEGORY :
exports.getExpensesByCategoryService =
    async (category) => {

        return await Expense.find({

            category,

            isDeleted: false,

        })

            .populate(
                "createdBy",
                "username role"
            )

            .sort({
                createdAt: -1,
            });

    };




// LOGIC FOR DELETE EXPENSE :
exports.deleteExpenseService =
    async (id) => {

        const expense =
            await Expense.findById(id);

        if (!expense) {

            throw new Error(
                "Expense not found"
            );

        }

        expense.isDeleted = true;

        await expense.save();

        return expense;

    };



// LOGIC FOR DAILY EXPENSE REPORT :
exports.dailyExpenseReportService =
    async () => {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const tomorrow =
            new Date(today);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const result =
            await Expense.aggregate([

                {
                    $match: {

                        isDeleted: false,

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    },
                },

                {
                    $group: {

                        _id: null,

                        totalExpense: {
                            $sum: "$amount",
                        },

                        totalEntries: {
                            $sum: 1,
                        },

                    },
                },

            ]);

        return {

            totalExpense:
                result[0]?.totalExpense || 0,

            totalEntries:
                result[0]?.totalEntries || 0,

        };

    };



// LOGIC FOR MONTHLY EXPENSE REPORT :
exports.monthlyExpenseReportService =
    async () => {

        const today =
            new Date();

        const firstDay =
            new Date(

                today.getFullYear(),

                today.getMonth(),

                1

            );

        const nextMonth =
            new Date(

                today.getFullYear(),

                today.getMonth() + 1,

                1

            );

        const result =
            await Expense.aggregate([

                {
                    $match: {

                        isDeleted: false,

                        createdAt: {
                            $gte: firstDay,
                            $lt: nextMonth
                        }

                    },
                },

                {
                    $group: {

                        _id: null,

                        totalExpense: {
                            $sum: "$amount",
                        },

                        totalEntries: {
                            $sum: 1,
                        },

                    },
                },

            ]);

        return {

            totalExpense:
                result[0]?.totalExpense || 0,

            totalEntries:
                result[0]?.totalEntries || 0,

        };

    };




// LOGIC FOR CATEGORY EXPENSE REPORT :
exports.categoryExpenseReportService =
    async () => {

        return await Expense.aggregate([

            {
                $match: {

                    isDeleted: false,

                },
            },

            {
                $group: {

                    _id: "$category",

                    totalExpense: {
                        $sum: {
                            $toDouble: "$amount"
                        }
                    },

                    totalEntries: {
                        $sum: 1,
                    },

                },
            },

            {
                $sort: {
                    totalExpense: -1,
                },
            },

        ]);

    };

// LOGIC FOR  MONTHLY SALARY EXPENSE REPORT
exports.monthlySalaryExpenseService =
    async () => {

        const today = new Date();

        const month =
            today.getMonth() + 1;

        const year =
            today.getFullYear();

        const Payroll =
            require("../../staff/models/payrollModel");

        const result =
            await Payroll.aggregate([

                {
                    $match: {

                        month: Number(month),

                        year: Number(year)

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalSalaryExpense: {
                            $sum: "$netSalary"
                        },

                        totalEmployees: {
                            $sum: 1
                        }

                    }

                }

            ]);

        return {

            month,

            year,

            totalSalaryExpense:
                result[0]?.totalSalaryExpense || 0,

            totalEmployees:
                result[0]?.totalEmployees || 0

        };

    };




//LOGIC FOR PROFIT LOSS REPORT :
exports.profitLossReportService =
    async () => {

        const currentDate =
            new Date();

        const currentMonth =
            currentDate.getMonth() + 1;

        const currentYear =
            currentDate.getFullYear();



        // TOTAL SLIPS + INCOME
        const slipData =
            await Slip.aggregate([

                {
                    $match: {

                        createdAt: {

                            $gte: new Date(
                                currentYear,
                                currentMonth - 1,
                                1
                            ),

                            $lt: new Date(
                                currentYear,
                                currentMonth,
                                1
                            )

                        }

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalIncome: {
                            $sum: "$amount"
                        },

                        totalSlips: {
                            $sum: 1
                        }

                    }

                }

            ]);



        // SLIP TYPE BREAKDOWN
        const slipTypeBreakdown =
            await Slip.aggregate([

                {
                    $match: {

                        createdAt: {

                            $gte: new Date(
                                currentYear,
                                currentMonth - 1,
                                1
                            ),

                            $lt: new Date(
                                currentYear,
                                currentMonth,
                                1
                            )

                        }

                    }

                },

                {
                    $group: {

                        _id: "$slipType",

                        totalIncome: {
                            $sum: "$amount"
                        },

                        totalSlips: {
                            $sum: 1
                        }

                    }

                }

            ]);


        // NORMAL EXPENSES
        const normalExpenseData =
            await Expense.aggregate([

                {
                    $match: {

                        category: {
                            $ne: "MONTHLY_SALARY"
                        },

                        createdAt: {

                            $gte: new Date(
                                currentYear,
                                currentMonth - 1,
                                1
                            ),

                            $lt: new Date(
                                currentYear,
                                currentMonth,
                                1
                            )

                        }

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalExpense: {
                            $sum: "$amount"
                        }

                    }

                }

            ]);



        // STAFF SALARY
        const salaryData =
            await Payroll.aggregate([

                {
                    $match: {

                        month: Number(currentMonth),

                        year: Number(currentYear)

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalSalary: {
                            $sum: "$netSalary"
                        },

                        totalEmployees: {
                            $sum: 1
                        }

                    }

                }

            ]);



        // CATEGORY BREAKDOWN
        const expenseBreakdown =
            await Expense.aggregate([

                {
                    $group: {

                        _id: "$category",

                        totalExpense: {
                            $sum: "$amount"
                        },

                        totalEntries: {
                            $sum: 1
                        }

                    }

                }

            ]);



        const totalIncome =
            slipData[0]?.totalIncome || 0;

        const totalSlips =
            slipData[0]?.totalSlips || 0;

        const normalExpenses =
            normalExpenseData[0]?.totalExpense || 0;

        const salaryExpenses =
            salaryData[0]?.totalSalary || 0;

        const totalExpenses =
            normalExpenses + salaryExpenses;

        const profitOrLoss =
            totalIncome - totalExpenses;



        return {

            currentMonth,

            currentYear,

            totalIncome,

            totalSlips,

            slipTypeBreakdown,

            expenseBreakdown,

            normalExpenses,

            salaryExpenses,

            totalExpenses,

            profitOrLoss,

            status:
                profitOrLoss >= 0
                    ? "PROFIT"
                    : "LOSS"

        };

    };




// LOGIC FOR DAILY PROFIT LOSS REPORT:
exports.dailyProfitLossReportService =
    async () => {

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const tomorrow =
            new Date(today);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );



        // TOTAL SLIPS + INCOME FOR TODAY
        const slipData =
            await Slip.aggregate([

                {
                    $match: {

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalIncome: {
                            $sum: "$amount"
                        },

                        totalSlips: {
                            $sum: 1
                        }

                    }

                }

            ]);



        // SLIP TYPE BREAKDOWN FOR TODAY
        const slipTypeBreakdown =
            await Slip.aggregate([

                {
                    $match: {

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    }

                },

                {
                    $group: {

                        _id: "$slipType",

                        totalIncome: {
                            $sum: "$amount"
                        },

                        totalSlips: {
                            $sum: 1
                        }

                    }

                }

            ]);


        // NORMAL EXPENSES FOR TODAY
        const normalExpenseData =
            await Expense.aggregate([

                {
                    $match: {

                        category: {
                            $ne: "MONTHLY_SALARY"
                        },

                        isDeleted: false,

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalExpense: {
                            $sum: "$amount"
                        }

                    }

                }

            ]);



        // STAFF SALARY FOR TODAY
        const salaryData =
            await Payroll.aggregate([

                {
                    $match: {

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    }

                },

                {
                    $group: {

                        _id: null,

                        totalSalary: {
                            $sum: "$netSalary"
                        },

                        totalEmployees: {
                            $sum: 1
                        }

                    }

                }

            ]);



        // CATEGORY BREAKDOWN FOR TODAY
        const expenseBreakdown =
            await Expense.aggregate([

                {
                    $match: {

                        isDeleted: false,

                        createdAt: {
                            $gte: today,
                            $lt: tomorrow
                        }

                    }

                },

                {
                    $group: {

                        _id: "$category",

                        totalExpense: {
                            $sum: "$amount"
                        },

                        totalEntries: {
                            $sum: 1
                        }

                    }

                }

            ]);



        const totalIncome =
            slipData[0]?.totalIncome || 0;

        const totalSlips =
            slipData[0]?.totalSlips || 0;

        const normalExpenses =
            normalExpenseData[0]?.totalExpense || 0;

        const salaryExpenses =
            salaryData[0]?.totalSalary || 0;

        const totalExpenses =
            normalExpenses + salaryExpenses;

        const profitOrLoss =
            totalIncome - totalExpenses;



        return {

            today,

            totalIncome,

            totalSlips,

            slipTypeBreakdown,

            expenseBreakdown,

            normalExpenses,

            salaryExpenses,

            totalExpenses,

            profitOrLoss,

            status:
                profitOrLoss >= 0
                    ? "PROFIT"
                    : "LOSS"

        };

    };