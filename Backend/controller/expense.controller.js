const mongoose = require("mongoose")
const Expense = require("../model/expense.model")

//post an expense 
async function addExpense(req,res){
    try{
        let expense = await Expense.create(req.body)
        res.status(201).json(expense)
    }
    catch(error){
        console.log(error);
        res.status(400).json({"message":error.message})
    }
}

//get an expense record

module.exports={
    addExpense
}
