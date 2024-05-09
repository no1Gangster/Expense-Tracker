const express = require("express")
const{
    addUser,deleteUserInfo,
    addBudget,
    getUsers,
    getBudgetStatusInfo,
    loginUser
} = require("../controller/user.controller")

const userRouter = express.Router()

userRouter.post("/signup",addUser)
userRouter.post("/signin",loginUser)
userRouter.get("/",getUsers)
userRouter.delete("/:userId",deleteUserInfo)
userRouter.put("/:userId/budget",addBudget)
userRouter.get("/:userId/budgetStatus",getBudgetStatusInfo)

module.exports=userRouter