const express = require("express")
const{
    addUser,deleteUserInfo,
    addBudget,checkBudgetStatus
} = require("../controller/user.controller")

const userRouter = express.Router()

userRouter.post("/",addUser)
userRouter.delete("/:userId",deleteUserInfo)
userRouter.put("/:userId/budget",addBudget)
userRouter.get("/:userId/budgetStatus",checkBudgetStatus)

module.exports=userRouter