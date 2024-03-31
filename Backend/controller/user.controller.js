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

module.exports={
    addUser
}