const express = require("express")
const dbConnect = require("./db/db")
const userRouter = require("./route/user.route")
const expenseRouter = require("./route/expense.route")

require('dotenv').config()

const PORT = process.env.PORT || 3000
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
app.listen(PORT,()=>console.log("http://localhost:3000"))