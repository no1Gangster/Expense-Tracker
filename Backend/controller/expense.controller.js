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

//Update an expense of a given user
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

//Delete an expense of a given user
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

//Sort expenses by amount in descending order
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

//Sort expenses by expense date - recent one first
async function getExpenseSortedByExpenseDate(req,res){
    try{
        const {userId} = req.params
        const expenses = await Expense.find({userId}).sort({exp_date:-1})
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

//Recent week expense summary of a given user 
async function getExpenseSummaryLastSevenDays(req,res){
    try{
        const endDate = new Date();
        const startDate = new Date(endDate)
        startDate.setDate(startDate.getDate()-7)

        const start_date = startDate.toISOString().split('T')[0]
        const end_date = endDate.toISOString().split('T')[0]

        const {userId} = req.params
        const expenses = await Expense.find({userId,exp_date:{$gte:start_date,$lte:end_date}})

        let totalDebit=0
        let totalCredit=0
        let totalPending=0

        expenses.forEach((expense)=>{
            switch(expense.exp_type){
                case 'debit':
                    totalDebit += expense.amount;
                    break
                case 'credit':
                    totalCredit += expense.amount;
                    break
                case 'pending':
                    totalPending += expense.amount;
                    break
                default:
                    break
            }
        })

        const totalExpenses = totalCredit + totalDebit + totalPending
        const creditPercentage = ((totalCredit/totalExpenses)*100).toFixed(4)
        const debitPercentage = ((totalDebit/totalExpenses)*100).toFixed(4)
        const pendingPercentage = ((totalPending/totalExpenses)*100).toFixed(4)

        res.status(200).json({totalCredit,totalDebit,totalPending,creditPercentage,debitPercentage,pendingPercentage})
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

module.exports={
    addExpense,
    getExpenseByUserId,
    updateExpense,
    deleteExpense,
    getExpenseSortedByAmount,
    getExpenseSummaryLastSevenDays,
    getExpenseSortedByExpenseDate
}
