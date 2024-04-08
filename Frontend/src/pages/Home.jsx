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
			description: "Grocery shopping",
			amount: 50.25,
			date: "2024-03-01",
			type: "debit",
		},
		{
			id: 2,
			description: "Salary payment",
			amount: 2500.0,
			date: "2024-03-02",
			type: "credit",
		},
		{
			id: 3,
			description: "Electricity bill",
			amount: 80.5,
			date: "2024-03-03",
			type: "debit",
		},
		{
			id: 4,
			description: "Dinner at a restaurant",
			amount: 75.0,
			date: "2024-03-04",
			type: "debit",
		},
		{
			id: 5,
			description: "Gasoline",
			amount: 40.0,
			date: "2024-03-05",
			type: "debit",
		},
		{
			id: 6,
			description: "Online purchase",
			amount: 120.75,
			date: "2024-03-06",
			type: "debit",
		},
		{
			id: 7,
			description: "Freelance income",
			amount: 800.0,
			date: "2024-03-07",
			type: "credit",
		},
		{
			id: 8,
			description: "Phone bill",
			amount: 45.5,
			date: "2024-03-08",
			type: "debit",
		},
		{
			id: 9,
			description: "Movie tickets",
			amount: 25.0,
			date: "2024-03-09",
			type: "debit",
		},
		{
			id: 10,
			description: "Deposit",
			amount: 1000.0,
			date: "2024-03-10",
			type: "credit",
		},
		{
			id: 11,
			description: "Internet subscription",
			amount: 60.0,
			date: "2024-03-11",
			type: "debit",
		},
		{
			id: 12,
			description: "Lunch",
			amount: 15.5,
			date: "2024-03-12",
			type: "debit",
		},
		{
			id: 13,
			description: "Taxi fare",
			amount: 30.0,
			date: "2024-03-13",
			type: "debit",
		},
		{
			id: 14,
			description: "Gift purchase",
			amount: 50.0,
			date: "2024-03-14",
			type: "debit",
		},
		{
			id: 15,
			description: "Rent payment",
			amount: 1200.0,
			date: "2024-03-15",
			type: "pending",
		},
		{
			id: 16,
			description: "Cashback",
			amount: 20.0,
			date: "2024-03-16",
			type: "credit",
		},
		{
			id: 17,
			description: "Medical expenses",
			amount: 90.0,
			date: "2024-03-17",
			type: "debit",
		},
		{
			id: 18,
			description: "Utility bill",
			amount: 100.0,
			date: "2024-03-18",
			type: "debit",
		},
		{
			id: 19,
			description: "Refund",
			amount: 35.75,
			date: "2024-03-19",
			type: "credit",
		},
		{
			id: 20,
			description: "Grocery shopping",
			amount: 55.5,
			date: "2024-03-20",
			type: "debit",
		},
	];

	const debit = 5000;
	const credit = 3000;
	const pending = 4000;

	return (
		<div
			className="container-flex bg-dark main"
			style={{ height: "92.1svh" }}
		>
			<div className="blob-container">
				<MouseFollower />

				<div
					className="row"
					style={{ width: "99%" }}
				>
					<div className="col-md-4 text-light">
						<div className="d-flex justify-content-center ms-3 mb-md-5 z-3 position-relative">
							<HomePieChart
								credit={credit}
								debit={debit}
								pending={pending}
							/>
						</div>
						<div className="container mx-auto w-75 mb-3 pt-md-5 z-3 position-relative overview-div p-3 rounded-3">
							<Overview
								credit={credit}
								debit={debit}
								pending={pending}
							/>
						</div>
					</div>
					<div className="col-md-8 mt-5">
						<h1 className="text-light px-5 mb-3 z-3 position-relative">
							Expense History
						</h1>
						<div
							className="expense-list ms-4 me-1"
							style={{ height: "72.7svh", overflowY: "scroll" }}
						>
							{data &&
								data.map((item) => (
									<ExpenseCard
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
				<div className="sticky-bottom bg-transparent mt-5 mb-4 pt-4">
					<ExpenseForm />
				</div>
			</div>
		</div>
	);
}

export default Home;
