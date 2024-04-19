import React, { useEffect } from "react";
import ExpenseCard from "../components/ExpenseCard";
import HomePieChart from "../components/HomePieChart";
import Overview from "../components/Overview";
import ExpenseForm from "../components/ExpenseForm";
import MouseFollower from "../components/MouseFollower";

function Home() {
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

	return (
		<>
			<div
				className="row bg-text-dark g-0"
			>
				<div className="col-md-4 mt-md-5 p-0 text-light">
					<div className="d-flex justify-content-center ms-3 my-md-5 z-3 position-relative">
						<HomePieChart
							credit={credit}
							debit={debit}
							pending={pending}
						/>
					</div>
					<div className="container mx-auto w-75 mb-3 pt-md-5 z-3 position-relative overview-div rounded-3">
						<Overview
							credit={credit}
							debit={debit}
							pending={pending}
						/>
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
		</>
	);
}

export default Home;
