import React, { useEffect, useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import HomePieChart from "../components/HomePieChart";
import Overview from "../components/Overview";
import expenseApi from "../ApiService/Expense";
import expenseOverview from "../workers/expenseOverview";
import ExpenseForm from "../components/ExpenseForm";
// import MouseFollower from "../components/MouseFollower";

function Home() {
	const [data, setData] = useState([]);
	const id = String(import.meta.env.VITE_ROLL_NO);
	const [overview, setOverview] = useState({});
	const [update, setUpdate] = useState([]);

	async function getExpenses(id) {
		try {
			let res = await expenseApi.getExpenses(id);
			res.status ? setData(res.data) : console.log("404 Data Not Found");

			let newData = await expenseOverview(res.data);
			setOverview(newData);
			console.log(res.data);
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
		<>
			<div className="row bg-text-dark g-0">
				<div className="col-md-4 mt-md-5 p-0 text-light">
					<div className="d-flex justify-content-center ms-3 my-md-5 z-3 position-relative pichart">
						{overview && (
							<HomePieChart
								credit={overview.credit}
								debit={overview.debit}
								pending={overview.pending}
							/>
						)}
					</div>
					<div className="container mx-auto w-75 mb-3 p-1 ps-4 z-3 position-relative overview-div rounded-3">
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
			</div>

			<div className="sticky-bottom bg-transparent my-md-0 py-md-0 mt-5 mb-4 pt-4 pb-md-3 bottom-0">
				<ExpenseForm newExpense={addData} />
			</div>
		</>
	);
}

export default Home;
