const express = require("express")
const{
    addExpense,
    getExpenseByUserId,
    updateExpense,
    deleteExpense,getExpenseSortedByAmount, 
    filterExpenseByDate, filterExpenseByMonth,filterExpenseByYear, filterExpenseByType, 
    filterExpenseByCategory,
    getExpenseSummaryLastSevenDays,
    getOverview
}=require("../controller/expense.controller")

const expenseRouter = express.Router()

expenseRouter.post("/",addExpense)
expenseRouter.get("/:userId",getExpenseByUserId)
expenseRouter.get("/filterByDates/:userId",filterExpenseByDate)
expenseRouter.get("/filterByMonth/:userId",filterExpenseByMonth)
expenseRouter.get("/filterByYear/:userId",filterExpenseByYear)
expenseRouter.get("/filterByType/:userId",filterExpenseByType)
expenseRouter.get("/filterByCategory/:userId",filterExpenseByCategory)
expenseRouter.put("/:userId/:expenseId",updateExpense)
expenseRouter.delete("/:userId/:expenseId",deleteExpense)
expenseRouter.get("/:userId/sorted",getExpenseSortedByAmount)
expenseRouter.get("/:userId/weekSummary",getExpenseSummaryLastSevenDays)
expenseRouter.get("/getOverview/:userId",getOverview)

module.exports = expenseRouter