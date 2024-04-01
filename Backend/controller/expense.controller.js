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

//get all expenses of a user
async function getExpenseByUserId(req,res){
    try{
        let {userId} = req.params
        let expense = await Expense.find({userId})
        if(expense){
            res.status(200).json(expense)
        }
        else{
            res.status(404).json({"message":"Data not found"})
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({"message":error.message})
    }
}

module.exports={
    addExpense,
    getExpenseByUserId
}
