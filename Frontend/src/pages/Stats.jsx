import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import LineGraph from "../components/LineGraph";
import CategoryPieChart from "../components/CategoryPieChart";
import Overview from "../components/Overview";
import ExpenseCard from "../components/ExpenseCard";
import expenseApi from "../ApiService/Expense";
import expenseOverview from "../workers/expenseOverview";
import catgegoryWiseNet, { expenseTypeWiseSplit } from "../workers/expenseSort";
import { useAuth } from "../Context/AuthContext";

function Stats() {
	const authContext = useAuth();
	let { isLoggedIn, id } = authContext;

	const [expenses, setExpenses] = useState([]);
	const [update, setUpdate] = useState(0);
	const [overview, setOverview] = useState([]);
	const [expTypeData, setExpTypeData] = useState([]);
	const [expCatData, setExpCatData] = useState([]);

	const [sidebarExpType, setSidebarExpType] = useState("all");

	//Fetches expenses list and sets it in expenses state variable
	async function fetchData() {
		try {
			let res = await expenseApi.getExpenses(id);
			setExpenses(res.data);
		} catch (error) {
			console.log("Failed to fetch data at Stats Page\n" + error);
		}
	}

	//Calculates Total Credit, Total Debit and Total Pending for the expenses in the expenses state variable
	async function calculateOverview() {
		let res = expenseOverview(expenses);
		setOverview(res);
	}

	//Separates data into credit, debit, pending date wise which is used by LineGraph
	async function expenseTypeData() {
		let res = await expenseTypeWiseSplit(expenses);
		setExpTypeData(res);
	}

	//Separates expenses into categories and corresponding net expenses, which is used by PieChart
	async function expenseCategoryData() {
		let res = await catgegoryWiseNet(expenses, sidebarExpType);
		setExpCatData(res);
	}

	//Used to update state variable for refreshing dependent components
	function refreshExpenseHistory() {
		setUpdate(update + 1);
	}

	//Expenses are fetched inititally on page load.
	//Later if new data added or removed, the components are re-rendered with new data.
	useEffect(() => {
		fetchData();
	}, [isLoggedIn, id, update,sidebarExpType]);

	//After expenses are fetched, its corresponding overview is calculated
	useEffect(() => {
		calculateOverview();
		expenseTypeData();
		expenseCategoryData();
	}, [expenses]);

	return (
		<div className="container-fluid p-0 m-0 mx-auto">
			<Sidebar />
			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="dark-box ms-3 ps-4 col">
					{/* Displays overview data */}
					{overview && (
						<Overview
							credit={overview.credit}
							debit={overview.debit}
							pending={overview.pending}
						/>
					)}
				</div>
				<div className="dark-box col mx-md-3 mx-3 p-md-5">
					Budget Details
				</div>
			</div>
			<div className="row w-100 mx-auto justify-content-between">
				<div className="rounded col-md-7 ms-md-3 p-md-0 color-light">
					{expTypeData && <LineGraph data={expTypeData} />}
				</div>
				<div className="rounded col mx-md-3 pt-2 p-md-0">
					{expCatData && <CategoryPieChart data={expCatData} />}
				</div>
			</div>
			<div className="my-5 pb-md-3 pb-5 mx-1">
				<h3 className="text-light ms-5 mb-4">Expense History</h3>
				<div className="expense-list">
					{expenses &&
						expenses.map((item) => (
							<ExpenseCard
								category={item.exp_category}
								note={item.note}
								date={item.exp_date}
								expense={item.amount}
								type={item.exp_type}
								_id={item._id}
								update={refreshExpenseHistory}
								key={item._id}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default Stats;
