const express = require("express")
const{
    addExpense,
    getExpenseByUserId,
    updateExpense,
    deleteExpense,getExpenseSortedByAmount
}=require("../controller/expense.controller")

const expenseRouter = express.Router()

expenseRouter.post("/",addExpense)
expenseRouter.get("/:userId",getExpenseByUserId)
expenseRouter.put("/:userId/:expenseId",updateExpense)
expenseRouter.delete("/:userId/:expenseId",deleteExpense)
expenseRouter.get("/:userId/sorted",getExpenseSortedByAmount)

module.exports = expenseRouter