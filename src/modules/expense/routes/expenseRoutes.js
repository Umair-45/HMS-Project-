// Require Express :
const express =
    require("express");

// Mini Express App :
const router =
    express.Router();


// Require Expense Controller :
const expenseController =
    require(
        "../../../../src/modules/expense/controller/expenseController"
    );


// Require Auth Middleware :
const {
    protect,
} = require(
    "../../../../src/commons/middlewares/authMiddleware"
);


// Require Admin Middleware :
const {
    adminOnly,
} = require(
    "../../../../src/commons/middlewares/adminMiddleware"
);

// CREATE EXPENSE :
router.post(

    "/create-expense",

    protect,

    adminOnly("ADMIN"),

    expenseController.createExpense

);

// GET ALL EXPENSES :
router.get(

    "/all-expenses",

    protect,

    adminOnly("ADMIN"),

    expenseController.getAllExpenses

);

// GET CATEGORY EXPENSES :
router.get(

    "/category/:category",

    protect,

    adminOnly("ADMIN"),

    expenseController.getExpensesByCategory

);


// DELETE EXPENSE :
router.delete(

    "/delete-expense/:id",

    protect,

    adminOnly("ADMIN"),

    expenseController.deleteExpense

);

// DAILY EXPENSE REPORT :
router.get(

    "/daily-expense",

    protect,

    adminOnly("ADMIN"),

    expenseController.dailyExpenseReport

);

// MONTHLY EXPENSE REPORT :
router.get(

    "/monthly-expense",

    protect,

    adminOnly("ADMIN"),

    expenseController.monthlyExpenseReport

);

// CATEGORY EXPENSE REPORT :
router.get(

    "/expense-categories",

    protect,

    adminOnly("ADMIN"),

    expenseController.categoryExpenseReport

);

// MONTHLY SALARY REPORT
router.get(

    "/monthly-salary-expense",

    protect,

    adminOnly("ADMIN"),

    expenseController.monthlySalaryExpense

);

// PROFIT LOSS REPORT
router.get(

    "/profit-loss-report",

    protect,

    adminOnly("ADMIN"),

    expenseController.profitLossReport

);



// DAILY PROFIT LOSS REPORT
router.get(

    "/daily-profit-loss-report",

    protect,

    adminOnly("ADMIN"),

    expenseController.dailyProfitLossReport

);


// Export Module :
module.exports = router;
