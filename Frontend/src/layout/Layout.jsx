import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import MouseFollower from "../components/MouseFollower";
import ExpenseForm from "../components/ExpenseForm";

function Layout() {
	return (
		<div className="container-fluid p-0">
			<Navbar />
			<main className="">
				<Outlet />
			<div className="sticky-bottom bg-transparent my-md-0 py-md-0 mt-5 mb-4 pt-4 pb-md-3">
				<ExpenseForm />
			</div>
			</main>
		</div>
	);
}

export default Layout;
