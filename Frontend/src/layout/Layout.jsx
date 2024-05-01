import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";

function Layout() {
	return (
		<div className="container-fluid p-0 position-relative">
			<Navbar />
			<main className="">
				<div className="position-relative">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default Layout;
