const mongoose = require("mongoose")
const Expense = require("../model/expense.model")

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

async function filterExpenseByDate(req,res){
    try {
        let userId=req.params.userId
        let startDateStr=req.query.startDate
        let endDateStr=req.query.endDate
        if(!startDateStr || !endDateStr){
            res.status(400).json({"message":"Please enter a valid start date and end date"})
        }
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        if(endDate<=startDate){
            res.status(400).json({"message":"Please enter a valid To_Date"})
        }
        let expenses = await Expense.find({
            userId,
            $expr: {
                $and: [
                    { $gte: [{ $toDate: "$date" }, startDate] },
                    { $lte: [{ $toDate: "$date" }, endDate] }
                ]
            }
        });
        if (expenses.length > 0) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ "message": "No transactions found within the specified date range" });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({"message":error.message})
    }
}

async function filterExpenseByMonth(req,res){
    try {
        let userId=req.params.userId
        let year=parseInt(req.query.year)
        let month=parseInt(req.query.month)
        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            res.status(400).json({ "message": "Please provide a valid year and month" });
        }
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        let expenses = await Expense.find({
            userId,
            $expr: {
                $and: [
                    { $gte: [{ $toDate: "$date" }, startDate] },
                    { $lte: [{ $toDate: "$date" }, endDate] }
                ]
            }
        });
    
        if (expenses.length > 0) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ "message": "No transactions found for the specified month and year" });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({"message":error.message})
    }
}

async function filterExpenseByYear(req,res){
    try {
        let userId=req.params.userId
        let year=parseInt(req.query.year)
        if(isNaN(year)){
            res.status(400).json({"message":"Please provide a year"})
        }
        const startDate = new Date(year, 0, 1); 
        const endDate = new Date(year + 1, 0, 0, 23, 59, 59);
        let expenses = await Expense.find({
            userId,
            $expr: {
                $and: [
                    { $gte: [{ $toDate: "$date" }, startDate] },
                    { $lte: [{ $toDate: "$date" }, endDate] }
                ]
            }
        });
    
        if (expenses.length > 0) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ "message": "No transactions found for the specified year" });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({"message":error.message})
    }
}

async function updateExpense(req,res){
    try{
        let {userId,expenseId} = req.params
        let updateData = req.body
        let expense = await Expense.findOneAndUpdate({userId:userId,_id:expenseId},updateData,{new:true})
        if(!expense){
            res.status(404).json({"message":"Expense not found"})
        }
        res.status(200).json(expense)

    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

async function deleteExpense(req,res){
    try{
        let {userId,expenseId}=req.params
        let expense = await Expense.findOneAndDelete({userId,_id:expenseId})
        res.status(200).json({expense,"message":"Expense deleted successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

async function getExpenseSortedByAmount(req,res){
    try{
        const {userId} = req.params
        const expenses = await Expense.find({userId}).sort({amount:-1})
        if(expenses){
            res.status(200).json(expenses)
        }
        else{
            res.status(404).json({"message":"Expense not found"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

module.exports={
    addExpense,
    getExpenseByUserId,
    filterExpenseByDate,
    filterExpenseByMonth,
    filterExpenseByYear,
    updateExpense,
    deleteExpense,
    getExpenseSortedByAmount
}