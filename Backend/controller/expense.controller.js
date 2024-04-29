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

//All Expenses overview
async function getOverview(req,res){
    try {
        const {userId}=req.params
        const user=await User.findById(userId)
        let balance=user.balance
        const expenses=await Expense.find({userId})
        if(expenses){
            let totalDebit=0,totalCredit=0,totalPending=0;
            expenses.forEach(expense=>{
                if(expense.exp_type.toLowerCase()=="credit"){
                    totalCredit+=expense.amount
                }
                else if(expense.exp_type.toLowerCase()=='debit'){
                    totalDebit+=expense.amount
                }
                else if(expense.exp_type.toLowerCase()=='pending'){
                    totalPending+=expense.amount
                }
            })
            balance=totalCredit+totalPending-totalDebit;
            user.balance=balance
            await user.save();
            res.status(200).json({totalCredit,totalDebit,totalPending,balance})
        }
        else{
            res.status(404).json({"message":"No transactions found."})
        }
    } 
    catch (error) {
        console.log(error)
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
async function filterExpenseByType(req,res){
    try {
        let userId=req.params.userId
        let type=req.query.type
        let expense=await Expense.find({userId,exp_type:type})
        if(expense.length>0){
            res.status(200).json(expense)
        }
        else{
            res.status(404).json({"message":`No transactions found for ${type}`})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":error.message})
    }
}

async function filterExpenseByCategory(req,res){
    try {
        let userId=req.params.userId
        let category=req.query.category
        let categoryRegex=new RegExp(category,'i')
        let expense=await Expense.find({userId,exp_category:{$regex:categoryRegex}})
        if(expense.length>0){
            res.status(200).json(expense)
        }
        else{
            res.status(404).json({"message":`No transactions found for ${category}`})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":error.message})
    }
}


module.exports={
    addExpense,
    getExpenseByUserId,
    updateExpense,
    deleteExpense,
    getExpenseSortedByAmount,
    getExpenseSummaryLastSevenDays,
    getExpenseSortedByExpenseDate,
    getOverview,
    filterExpenseByCategory,
    filterExpenseByDate,
    filterExpenseByMonth,
    filterExpenseByYear,
    filterExpenseByType
}