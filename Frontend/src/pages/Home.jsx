import React, { useEffect, useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import HomePieChart from "../components/HomePieChart";
import Overview from "../components/Overview";
import expenseApi from "../ApiService/Expense";
import expenseOverview from "../workers/expenseOverview";
import ExpenseForm from "../components/ExpenseForm";
import { useAuth } from "../Context/AuthContext";
// import MouseFollower from "../components/MouseFollower";

function Home() {
	let authContext = useAuth();
	let { isLoggedIn, id } = authContext;

	const [expenses, setExpenses] = useState([]); //Stores expenses to display
	const [overview, setOverview] = useState([]); //Sets net overview data
	const [update, setUpdate] = useState(0); //Use to refresh components on different actions

	//Fetches expenses list and sets it in expenses state variable
	async function fetchData() {
		try {
			if (id && id.length == 24) {
				let res = await expenseApi.getExpenses(id);
				setExpenses(res.data);
			}
		} catch (error) {
			console.log("Failed to fetch data at homepage\n" + error);
		}
	}

	//Calculates Total Credit, Total Debit and Total Pending for the expenses in the expenses state variable
	async function calculateOverview() {
		if (expenses) {
			let res = await expenseOverview(expenses);
			setOverview(res);
		}
	}

	//Used to update state variable for refreshing dependent components
	function refreshExpenseHistory() {
		setUpdate(update + 1);
	}

	//Expenses are fetched inititally on page load.
	//Later if new data added or removed, the components are re-rendered with new data.
	useEffect(() => {
		fetchData();
	}, [isLoggedIn, id, update]);

	//After expenses are fetched, its corresponding overview is calculated
	useEffect(() => {
		calculateOverview();
	}, [expenses]);

	return (
		<>
			<div className="row bg-text-dark g-0">
				<div className="col-md-4 mt-md-5 p-0 text-light">
					<div className="d-flex justify-content-center ms-3 my-md-5 z-3 position-relative pichart">
						{/* Displays PieChart for data in overview state variable */}
						{overview && (
							<HomePieChart
								credit={overview.credit}
								debit={overview.debit}
								pending={overview.pending}
							/>
						)}
					</div>
					<div className="container mx-auto w-75 mb-3 p-1 ps-4 z-3 position-relative overview-div rounded-3">
						{/* Displays overview data */}
						{overview && (
							<Overview
								credit={overview.credit}
								debit={overview.debit}
								pending={overview.pending}
							/>
						)}
					</div>
				</div>
				<div className="col-md-8 mt-md-4 mx-auto p-0">
					<h1 className="text-light px-5 mb-3 z-3 position-relative">
						Expense History
					</h1>
					<div className="container-fluid expense-list ms-4 me-1">
						{/* Maps expenses to display in list format */}
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

			<div className="sticky-bottom bg-transparent my-md-0 py-md-0 mt-5 mb-4 pt-4 pb-md-3 bottom-0">
				<ExpenseForm newExpense={refreshExpenseHistory} />
			</div>
		</>
	);
}

export default Home;
