const User = require("../model/user.model");
const Expense = require("../model/expense.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Post a user detail
async function addUser(req, res) {
	try {
		let { name, email, mobile, password, budget, startDate, endDate } =
			req.body;
		let extEmail = await User.findOne({ email: email });
		if (extEmail) {
			return res.status(400).json({ message: "Email is already in use" });
		}
		let extMobile = await User.findOne({ mobile: mobile });
		if (extMobile) {
			return res
				.status(400)
				.json({ message: "Mobile no. is already in use" });
		}
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);

		let user = await User.create({
			name: name,
			email: email,
			mobile: mobile,
			password: password,
			budget: budget,
			startDate: startDate,
			endDate: endDate,
		});
		res.status(201).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
}

const loginUser = async (req, res) => {
	try {
		let { email, password } = req.body;
		let userdetails = await User.findOne({ email: email });
		if (!userdetails) {
			return res
				.status(400)
				.json({ message: "Provide a Valid Email-ID" });
		}
		let isPasswordValid = await bcrypt.compare(
			password,
			userdetails.password
		);
		if (isPasswordValid) {
			const token = jwt.sign(
				{
					user: {
						userId: userdetails._id,
						name: userdetails.name,
						email: userdetails.email,
						mobile: userdetails.mobile,
					},
				},
				process.env.JWT_SECRET
			);
			console.log(token);
			res.status(200).json({
				message: "Login Successful",
				userdetails,
				token,
			});
		} else {
			res.status(400).json({ message: "Invalid Password" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

//get all users
async function getUsers(req, res) {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}

//Delete a user account
async function deleteUserInfo(req, res) {
	try {
		const { userId } = req.params;
		const deletedUser = await User.findOneAndDelete({ _id: userId });
		if (deletedUser) {
			res.status(200).json({
				deletedUser,
				message: "User deleted successfully",
			});
		} else {
			res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}

//set a budget for a given user
async function addBudget(req, res) {
	const { userId } = req.params;
	const { budget, startDate, endDate } = req.body;

	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { budget, startDate, endDate } },
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({
			user: updatedUser,
			message: "Budget updated successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
}

//Budget tracking
async function checkBudgetStatus(userId) {
	try {
		const user = await User.findById(userId);
		if (!user || !user.budget) {
			return {
				status: "error",
				message: "User not found or budget not set",
			};
		}
		const userBudget = user.budget;
		const startDate = user.startDate;
		const endDate = user.endDate;

		const expenses = await Expense.find({
			userId: userId,
			exp_date: { $gte: startDate, $lte: endDate },
		});
		//can be changed to reuse getOverview() if date range is added
		let totalCredit = 0,
			totalDebit = 0,
			totalPending = 0;
		expenses.forEach((expense) => {
			if (expense.exp_type.toLowerCase() === "credit") {
				totalCredit += expense.amount;
			} else if (expense.exp_type.toLowerCase() === "debit") {
				totalDebit += expense.amount;
			} else if (expense.exp_type.toLowerCase() === "pending") {
				totalPending += expense.amount;
			}
		});
		const balance = Math.abs(totalCredit - totalDebit + totalPending);
		const budgetExhausted = totalDebit / userBudget;
		let budgetStatus = "";

		if (budgetExhausted >= 0.5 && budgetExhausted < 0.9) {
			budgetStatus = `You have reached 50% of your budget limit set between ${startDate} and ${endDate}.You are Rs.${
				userBudget - totalDebit
			} away from over spending`;
		} else if (budgetExhausted >= 0.9 && budgetExhausted < 1) {
			budgetStatus = `You have reached 90% of your budget limit set between ${startDate} and ${endDate}.You are Rs.${
				userBudget - totalDebit
			} away from over spending`;
		} else {
			budgetStatus =
				userBudget >= totalDebit
					? `Within budget limit set between ${startDate} and ${endDate}`
					: `Exceeded budget limit set between ${startDate} and ${endDate}. Over budget by Rs.${
							totalDebit - userBudget
					  }`;
		}
		return {
			userBudget: userBudget,
			totalDebit: totalDebit,
			balance: balance,
			budgetStatus: budgetStatus,
			status: "success",
		};
	} catch (error) {
		console.log(error);
		return { status: "error", message: error.message };
	}
}

//Budget status router handler
async function getBudgetStatusInfo(req, res) {
	try {
		const { userId } = req.params;
		const budgetInfo = await checkBudgetStatus(userId);
		if (budgetInfo.status === "error") {
			return res.status(404).json(budgetInfo);
		}
		const { totalDebit, userBudget, budgetStatus, balance } = budgetInfo;
		res.status(200).json({
			totalDebit: totalDebit,
			userBudget: userBudget,
			budgetStatus: budgetStatus,
			current_balance: balance,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ status: "error", message: error.message });
	}
}

module.exports = {
	addUser,
	loginUser,
	deleteUserInfo,
	addBudget,
	checkBudgetStatus,
	getUsers,
	getBudgetStatusInfo,
};
