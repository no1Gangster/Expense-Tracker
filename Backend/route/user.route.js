const express = require("express")
const{
    addUser,deleteUserInfo,
    addBudget,
    getUsers,
    getBudgetStatusInfo
} = require("../controller/user.controller")

const userRouter = express.Router()

userRouter.post("/",addUser)
userRouter.get("/",getUsers)
userRouter.delete("/:userId",deleteUserInfo)
userRouter.put("/:userId/budget",addBudget)
userRouter.get("/:userId/budgetStatus",getBudgetStatusInfo)

module.exports=userRouter