const express = require("express")
const{
    addUser,deleteUserInfo,
    addBudget,
    getUsers,
    getBudgetStatusInfo,
    loginUser,
    verifyOTP
} = require("../controller/user.controller")

const userRouter = express.Router()

userRouter.get("/",getUsers)
userRouter.delete("/:userId",deleteUserInfo)
userRouter.put("/:userId/budget",addBudget)
userRouter.get("/:userId/budgetStatus",getBudgetStatusInfo)

userRouter.post("/verifyotp",verifyOTP)

//login and signup routes

userRouter.post("/signup",addUser)
userRouter.post("/signin",loginUser)

module.exports=userRouter