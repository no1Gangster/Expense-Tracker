const mongoose = require('mongoose')
const User = require("../model/user.model");
const Expense = require("../model/expense.model");
// const { getOverview } = require('./expense.controller');

//Post a user detail
async function addUser(req,res){
    try{
        let user = await User.create(req.body)
        res.status(201).json(user)
    }
    catch(error){
        console.log(error);
        res.status(400).json({"message":error.message})
    }
}

//Delete a user account
async function deleteUserInfo(req,res){
    try{
        const {userId} = req.params
        const deletedUser = await User.findOneAndDelete({_id:userId})
        if(deletedUser){
            res.status(200).json({deletedUser,"message":"User deleted successfully"})
        }
        else{
            res.status(400).json({"message":"User not found"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

//set a budget for a given user
async function addBudget(req,res){
    const {userId} = req.params
    const {budget, startDate, endDate} = req.body

    try{
        const updatedUser = await User.findOneAndUpdate(
            {_id:userId},
            {$set:{budget,startDate,endDate}},
            {new:true}
        )
        if(!updatedUser){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({user:updatedUser,"message":"Budget updated successfully"})
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}

//Budget tracking
async function checkBudgetStatus(req,res){
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({"message":"User not found"})
        }

        const userBudget = user.budget
        const startDate = user.startDate
        const endDate = user.endDate

        const expenses = await Expense.find({
            userId:userId,exp_date:{$gte:startDate,$lte:endDate}
        })

        //can be changed to reuse getOverview() if date range is added
        let totalCredit=0,totalDebit=0,totalPending=0
        expenses.forEach(expense =>{
            if(expense.exp_type.toLowerCase()==='credit'){
                totalCredit+=expense.amount
            }else if(expense.exp_type.toLowerCase()==='debit'){
                totalDebit+=expense.amount
            }else if(expense.exp_type.toLowerCase()==='pending'){
                totalPending+=expense.amount
            }
        })
        const balance = totalCredit - totalDebit + totalPending
        const budgetStatus = balance >= userBudget? 'Within budget limit':'Exceeded budget limit'

        res.status(200).json({userBudget:userBudget,balance:balance,budgetStatus:budgetStatus})
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
    }
}


module.exports={
    addUser,
    deleteUserInfo,
    addBudget,
    checkBudgetStatus
}