const express = require("express")
const dbConnect = require("./db/db")
const userRouter = require("./route/user.route")
const expenseRouter = require("./route/expense.route")

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",userRouter)
app.use("/expense",expenseRouter)

//Healthcheck
app.get("/",(req,res)=>{
    res.send("Helloo")
})

dbConnect()
app.listen(3000,()=>console.log("http://localhost:3000"))