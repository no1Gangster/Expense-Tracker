import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import LineGraph from "../components/LineGraph";
import CategoryPieChart from "../components/CategoryPieChart";
import Overview from "../components/Overview";
import ExpenseCard from "../components/ExpenseCard";
import categorySort from "../workers/categorySort";

function Stats() {
	const data = [
		{
			id: 1,
			description: "Groceries",
			amount: 50.0,
			date: "2024-04-01",
			type: "credit",
			category: "food",
		},
		{
			id: 2,
			description: "Dinner with friends",
			amount: 30.0,
			date: "2024-04-02",
			type: "debit",
			category: "other",
		},
		{
			id: 3,
			description: "Gas refill",
			amount: 40.0,
			date: "2024-04-03",
			type: "credit",
			category: "other",
		},
		{
			id: 4,
			description: "Salary",
			amount: 2000.0,
			date: "2024-04-05",
			type: "pending",
			category: "other",
		},
		{
			id: 5,
			description: "Movie tickets",
			amount: 25.0,
			date: "2024-04-06",
			type: "debit",
			category: "other",
		},
		{
			id: 6,
			description: "Electricity bill",
			amount: 60.0,
			date: "2024-04-07",
			type: "credit",
			category: "utility",
		},
		{
			id: 7,
			description: "Phone bill",
			amount: 35.0,
			date: "2024-04-10",
			type: "debit",
			category: "utility",
		},
		{
			id: 8,
			description: "Freelance project payment",
			amount: 300.0,
			date: "2024-04-11",
			type: "pending",
			category: "other",
		},
		{
			id: 9,
			description: "New headphones",
			amount: 70.0,
			date: "2024-04-13",
			type: "debit",
			category: "other",
		},
		{
			id: 10,
			description: "Gift for friend's birthday",
			amount: 20.0,
			date: "2024-04-15",
			type: "credit",
			category: "other",
		},
		{
			id: 11,
			description: "Pending payment from client",
			amount: 500.0,
			date: "2024-04-16",
			type: "pending",
			category: "other",
		},
		{
			id: 12,
			description: "Lunch at work",
			amount: 15.0,
			date: "2024-04-17",
			type: "credit",
			category: "food",
		},
		{
			id: 13,
			description: "Monthly subscription",
			amount: 10.0,
			date: "2024-04-18",
			type: "debit",
			category: "utility",
		},
		{
			id: 14,
			description: "Repair car",
			amount: 200.0,
			date: "2024-04-19",
			type: "pending",
			category: "other",
		},
		{
			id: 15,
			description: "Salary",
			amount: 2000.0,
			date: "2024-04-21",
			type: "debit",
			category: "other",
		},
		{
			id: 16,
			description: "Groceries",
			amount: 60.0,
			date: "2024-04-23",
			type: "pending",
			category: "food",
		},
		{
			id: 17,
			description: "Gift for sister's birthday",
			amount: 30.0,
			date: "2024-04-24",
			type: "debit",
			category: "personal",
		},
		{
			id: 18,
			description: "Dinner at restaurant",
			amount: 40.0,
			date: "2024-04-25",
			type: "debit",
			category: "utility",
		},
		{
			id: 19,
			description: "Online course",
			amount: 50.0,
			date: "2024-04-27",
			type: "pending",
			category: "medical",
		},
		{
			id: 20,
			description: "Coffee with friends",
			amount: 10.0,
			date: "2024-04-28",
			type: "debit",
			category: "other",
		},
	];
	const debit = 5000;
	const credit = 3000;
	const pending = 4000;

	const [catData, setCatData] = useState([]);

	useEffect(() => {
		setCatData(categorySort(data));
	}, []);

	return (
		<div className="container-fluid p-0 m-0 mx-auto">
			<Sidebar />
			<div className="row mb-3 w-100 mt-4 mx-auto justify-content-between">
				<div className="dark-box mx-3 p-0 col">
					<Overview
						credit={credit}
						debit={debit}
						pending={pending}
					/>
				</div>
				<div className="dark-box col mx-md-3 mx-3 p-md-5">
					Budget Details
				</div>
			</div>
			<div className="row w-100 mx-auto justify-content-between">
				<div className="rounded col-md-7 mx-md-3 p-md-0">
					<LineGraph data={data} />
				</div>
				<div className="rounded col mx-md-3 pt-2 p-md-0">
					{catData && <CategoryPieChart data={catData} />}
				</div>
			</div>
			<div className="mt-5">
				<h3 className="text-light ms-5 mb-4">Expense History</h3>
				<div className="expense-list">
					{data &&
						data.map((item) => (
							<ExpenseCard
								category={item.category}
								note={item.description}
								date={item.date}
								expense={item.amount}
								type={item.type}
								key={item.id}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default Stats;
