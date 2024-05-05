<<<<<<< HEAD
const User = require("../model/user.model");
const Expense = require("../model/expense.model");
=======
const mongoose = require('mongoose')
const User = require("../model/user.model");
const Expense = require("../model/expense.model");
// const { getOverview } = require('./expense.controller');
>>>>>>> 4a578f0361ef2ecbe7bce6acb6a1d81188a3095c

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

<<<<<<< HEAD
//get all users
async function getUsers(req,res){
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

=======
>>>>>>> 4a578f0361ef2ecbe7bce6acb6a1d81188a3095c
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
<<<<<<< HEAD
async function checkBudgetStatus(userId){
    try{
        const user = await User.findById(userId)
        if(!user || !user.budget){
            return { status: "error", message: "User not found or budget not set" };
=======
async function checkBudgetStatus(req,res){
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({"message":"User not found"})
>>>>>>> 4a578f0361ef2ecbe7bce6acb6a1d81188a3095c
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
        const balance = Math.abs(totalCredit - totalDebit + totalPending)
<<<<<<< HEAD
        const budgetExhausted = totalDebit/userBudget
        let budgetStatus=""

        if(budgetExhausted>=0.5 && budgetExhausted<0.9){
            budgetStatus = `You have reached 50% of your budget limit set between ${startDate} and ${endDate}.You are Rs.${userBudget-totalDebit} away from over spending`
        }else if(budgetExhausted>=0.9 && budgetExhausted<1){
            budgetStatus = `You have reached 90% of your budget limit set between ${startDate} and ${endDate}.You are Rs.${userBudget-totalDebit} away from over spending`
        }else{
            budgetStatus = userBudget >= totalDebit? `Within budget limit set between ${startDate} and ${endDate}`:`Exceeded budget limit set between ${startDate} and ${endDate}. Over budget by Rs.${totalDebit-userBudget}` 
        }
        console.log(user.email);
        
        return {userBudget:userBudget,totalDebit:totalDebit,balance:balance,budgetStatus:budgetStatus,status:"success"}
    }catch(error){  
        console.log(error); 
        return {status:"error",message:error.message}
    }
}

//Budget status router handler
async function getBudgetStatusInfo(req,res){
    try{
        const {userId} = req.params
        const budgetInfo = await checkBudgetStatus(userId)
        if(budgetInfo.status === "error"){
            return res.status(404).json(budgetInfo)
        }
        const {totalDebit, userBudget, budgetStatus, balance} = budgetInfo
        res.status(200).json({totalDebit:totalDebit,userBudget:userBudget,budgetStatus:budgetStatus,current_balance:balance})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:"error","message":error.message})
=======
        const budgetStatus = userBudget >= totalDebit? `Within budget limit set between ${startDate} and ${endDate}`:`Exceeded budget limit set between ${startDate} and ${endDate}. Over budget by Rs.${totalDebit-userBudget}`
        res.status(200).json({userBudget:userBudget,totalDebit:totalDebit,balance:balance,budgetStatus:budgetStatus})
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error.message})
>>>>>>> 4a578f0361ef2ecbe7bce6acb6a1d81188a3095c
    }
}

module.exports={
    addUser,
    deleteUserInfo,
    addBudget,
<<<<<<< HEAD
    checkBudgetStatus,
    getUsers,
    getBudgetStatusInfo
=======
    checkBudgetStatus
>>>>>>> 4a578f0361ef2ecbe7bce6acb6a1d81188a3095c
}