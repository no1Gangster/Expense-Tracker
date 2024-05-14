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
<<<<<<< HEAD
<<<<<<< HEAD

function Stats() {
	const authContext = useAuth();
	let { isLoggedIn, id } = authContext;

	const [expenses, setExpenses] = useState([]);
	const [update, setUpdate] = useState(0);
	const [overview, setOverview] = useState([]);
	const [expTypeData, setExpTypeData] = useState([]);
	const [expCatData, setExpCatData] = useState([]);

	const [sidebarExpType, setSidebarExpType] = useState("all");
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
import filterExpenses from "../workers/expenseFilter";

function Stats() {
	//Context variables
	const authContext = useAuth();
	let { isLoggedIn, id } = authContext;

	const [expenses, setExpenses] = useState([]); 					//Expense Data
	const [update, setUpdate] = useState(0); 						//Use to refresh components on different actions
	const [overview, setOverview] = useState([]);					//Sets net overview data

	const [expTypeData, setExpTypeData] = useState([]); 			//Used to store data for LineGraph component
	const [expCatData, setExpCatData] = useState([]); 				//Used to store data for PieChart component

	const [sidebarExpType, setSidebarExpType] = useState("all"); 	//Used to set expenses if only expense type is selected in sidebar component
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4

	//Fetches expenses list and sets it in expenses state variable
	async function fetchData() {
		try {
<<<<<<< HEAD
<<<<<<< HEAD
			if(id && id.length == 24) {
=======
			if (id && id.length == 24) {
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
			if (id && id.length == 24) {
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
				let res = await expenseApi.getExpenses(id);
				setExpenses(res.data);
			}
		} catch (error) {
			console.log("Failed to fetch data at Stats Page\n" + error);
		}
	}

<<<<<<< HEAD
<<<<<<< HEAD
	async function fetchTypeData() {
		try {
			if(id.length == 24) {
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	//If only expense type is selected as filter in sidebar then this function is used to get filtered data
	async function fetchTypeData() {
		try {
			if (id.length == 24) {
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
				let res = await expenseApi.getTypeData(id, sidebarExpType);
				setExpenses(res.data);
			}
		} catch (error) {
			console.log("Failed to fetch Type data" + error);
		}
	}

	//Calculates Total Credit, Total Debit and Total Pending for the expenses in the expenses state variable
	async function calculateOverview() {
<<<<<<< HEAD
<<<<<<< HEAD
		if(expenses) {
=======
		if (expenses) {
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
		if (expenses) {
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			let res = expenseOverview(expenses);
			setOverview(res);
		}
	}

	//Separates data into credit, debit, pending date wise which is used by LineGraph
	async function expenseTypeData() {
<<<<<<< HEAD
<<<<<<< HEAD
		if(expenses){
=======
		if (expenses) {
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
		if (expenses) {
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			let res = await expenseTypeWiseSplit(expenses);
			setExpTypeData(res);
		}
	}

	//Separates expenses into categories and corresponding net expenses, which is used by PieChart
	async function expenseCategoryData() {
<<<<<<< HEAD
<<<<<<< HEAD
		if(expenses) {
=======
		if (expenses) {
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
		if (expenses) {
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			let res = await catgegoryWiseNet(expenses, sidebarExpType);
			setExpCatData(res);
		}
	}

	//Used to update state variable for refreshing dependent components
	function refreshExpenseHistory() {
		setUpdate(update + 1);
	}

<<<<<<< HEAD
<<<<<<< HEAD
	function getExpenseType(expType) {
		setSidebarExpType(expType);
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	//Gets filter from Sidebar compenent, redirects the filters to expenseFilter worker to get filtered data.
	async function getFilters(filters) {
		if (!filters || !filters.duration || filters.duration == "all") {
			console.log(filters);
			setSidebarExpType(filters.expType);
			refreshExpenseHistory();
		}

		if (filters && filters.duration != "all") {
			let filteredData = await filterExpenses(filters, id);
			setExpenses(filteredData);
		}
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	}

	//Expenses are fetched inititally on page load.
	//Later if new data added or removed, the components are re-rendered with new data.
	useEffect(() => {
		if (
			sidebarExpType == "credit" ||
			sidebarExpType == "debit" ||
			sidebarExpType == "pending"
		)
			fetchTypeData();
<<<<<<< HEAD
<<<<<<< HEAD
		else
			fetchData();
=======
		else fetchData();
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
		else fetchData();
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	}, [isLoggedIn, id, update, sidebarExpType]);

	//After expenses are fetched, its corresponding overview is calculated
	useEffect(() => {
		calculateOverview();
		expenseTypeData();
		expenseCategoryData();
	}, [expenses]);

	return (
		<div className="container-fluid p-0 m-0 mx-auto">
<<<<<<< HEAD
<<<<<<< HEAD
			<Sidebar returnExpType={getExpenseType} />
=======
			<Sidebar filters={getFilters} />
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
			<Sidebar filters={getFilters} />
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
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
