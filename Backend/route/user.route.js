const express = require("express")
const{
    addUser,deleteUserInfo,
    addBudget,
    getUsers,
    getBudgetStatusInfo,
    loginUser
} = require("../controller/user.controller")

const userRouter = express.Router()

// userRouter.post("/",addUser)
userRouter.get("/",getUsers)
userRouter.delete("/:userId",deleteUserInfo)
userRouter.put("/:userId/budget",addBudget)
userRouter.get("/:userId/budgetStatus",getBudgetStatusInfo)
userRouter.post("/")

//login and signup routes

userRouter.post("/signup",addUser)
userRouter.post("/signin",loginUser)

module.exports=userRouter