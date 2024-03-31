const mongoose = require("mongoose")

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
    note:String
},{
    timestamps:true //adds createdAt and updatedAt val
})

const Expense = mongoose.model("Expense",expenseSchema)
module.exports= Expense