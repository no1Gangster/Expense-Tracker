const express = require("express")
const dbConnect = require("./db/db")
const userRouter = require("./routes/user.route")
const expenseRouter = require("./routes/expense.route")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users",userRouter)
app.use("/expenses",expenseRouter)

dbConnect()
app.listen(5000,()=>console.log("http://localhost:5000"))