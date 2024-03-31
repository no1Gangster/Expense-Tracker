const express = require("express")
const{
    addExpense
}=require("../controller/expense.controller")

const expenseRouter = express.Router()

expenseRouter.post("/",addExpense)
module.exports = expenseRouter