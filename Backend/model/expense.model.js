const mongoose = require("mongoose")
const moment = require("moment-timezone")

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    exp_category:{
        type:String,
        required:true
    },
    exp_type:{
        type:String,
        enum:['debit','credit','pending'],
        required:true
    },
    note:String,
    createdAt: Date
})

//middleware --> set timestamp to ist
expenseSchema.pre("save",function(next){
    const nowUTC = moment.utc()
    const nowIST = nowUTC.add(5,"hours").add(30,"minutes").tz("Asia/Kolkata")
    this.createdAt = nowIST
    next()
})

const Expense = mongoose.model("Expense",expenseSchema)
module.exports= Expense