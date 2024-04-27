import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import LineGraph from "../components/LineGraph";
import CategoryPieChart from "../components/CategoryPieChart";
import Overview from "../components/Overview";
import ExpenseCard from "../components/ExpenseCard";
import expenseApi from "../ApiService/Expense";
import expenseOverview from "../workers/expenseOverview";
import ExpenseForm from "../components/ExpenseForm";
import catgegoryWiseNet from "../workers/expenseSort";

function Stats() {
	const [data, setData] = useState([]);

	const [overview, setOverview] = useState({});

	const id = import.meta.env.VITE_ROLL_NO;
	const [catData, setCatData] = useState([]);
	const [update, setUpdate] = useState([]);

	const [expType, setExpType] = useState("All");

	async function getExpenses(id) {
		try {
			let res = await expenseApi.getExpenses(id);
			res.status ? setData(res.data) : console.log("404 Data Not Found");

			console.log(res.data)

			let newData = await expenseOverview(res.data);
			setOverview(newData);

			let sortData = await catgegoryWiseNet(res.data, expType);
			setCatData(sortData);
		} catch (error) {
			console.log("Error: " + error);
		}
	}

	function deleteData(id) {
		const newData = data.filter((expense) => expense._id != id);
		console.log(newData);
		setData(newData);
		setUpdate(newData);
	}

	function addData(add) {
		const newData = [add, ...data];
		setData(newData);
		setUpdate(newData);
	}

	useEffect(() => {
		getExpenses(id);
	}, [update]);

	return (
		<div className="container-fluid p-0 m-0 mx-auto">
			<Sidebar />
			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="dark-box ms-3 ps-4 col">
					<Overview
						credit={overview.credit}
						debit={overview.debit}
						pending={overview.pending}
					/>
				</div>
				<div className="dark-box col mx-md-3 mx-3 p-md-5">
					Budget Details
				</div>
			</div>
			<div className="row w-100 mx-auto justify-content-between">
				<div className="rounded col-md-7 ms-md-3 p-md-0 color-light">
					<LineGraph data={data} />
				</div>
				<div className="rounded col mx-md-3 pt-2 p-md-0">
					{catData && <CategoryPieChart data={catData} />}
				</div>
			</div>
			<div className="my-5 pb-md-3 pb-5 mx-1">
				<h3 className="text-light ms-5 mb-4">Expense History</h3>
				<div className="expense-list">
					{data &&
						data.map((item) => (
							<ExpenseCard
								category={item.exp_category}
								note={item.note}
								date={item.exp_date}
								expense={item.amount}
								type={item.exp_type}
								_id={item._id}
								update={deleteData}
								key={item._id}
							/>
						))}
				</div>
			</div>

			<div className="sticky-bottom bg-transparent my-md-0 py-md-0 mt-5 mb-4 pt-4 pb-md-3 bottom-0">
				<ExpenseForm newExpense={addData} />
			</div>
		</div>
	);
}

export default Stats;
