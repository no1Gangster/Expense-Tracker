const express = require("express");
const dbConnect = require("./db/db");
const userRouter = require("./route/user.route");
const expenseRouter = require("./route/expense.route");

require("dotenv").config();

const cors = require("cors");

var corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 3000;
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/expense", expenseRouter);

//Healthcheck
app.get("/", (req, res) => {
	res.send("Helloo");
});

dbConnect();
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
