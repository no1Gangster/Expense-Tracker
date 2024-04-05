const express = require("express")
const{
    addUser,deleteUserInfo
} = require("../controller/user.controller")

const userRouter = express.Router()

userRouter.post("/",addUser)
userRouter.delete("/:userId",deleteUserInfo)

module.exports=userRouter