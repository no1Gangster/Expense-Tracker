const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    //Password field to be added + auth
    budget:{
        type:Number,
        default:0
    },
    startDate:{
        type:String,
        required:function(){
            return this.budget>0
        }
    },
    endDate:{
        type:String,
        required:function(){
            return this.budget>0
        }
    },

})

const User = mongoose.model("User",userSchema)
module.exports = User