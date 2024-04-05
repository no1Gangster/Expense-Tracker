const mongoose = require('mongoose')
const User = require("../model/user.model")

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

module.exports={
    addUser,
    deleteUserInfo
}