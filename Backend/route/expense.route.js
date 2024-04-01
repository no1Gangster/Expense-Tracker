const express = require("express")
const{
    addExpense,
    getExpenseByUserId
}=require("../controller/expense.controller")

const expenseRouter = express.Router()

expenseRouter.post("/",addExpense)
expenseRouter.get("/:userId",getExpenseByUserId)
module.exports = expenseRouter