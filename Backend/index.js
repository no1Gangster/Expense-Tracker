const express = require("express")
const dbConnect = require("./db/db")
const userRouter = require("./routes/user.route")
const expenseRouter = require("./routes/expense.route")
require('dotenv').config()


const app = express()
const PORT=process.env.PORT||5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users",userRouter)
app.use("/expenses",expenseRouter)

dbConnect()
app.listen(PORT,()=>console.log("http://localhost:5000"))