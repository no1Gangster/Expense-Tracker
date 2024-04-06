import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Navbar />
			<main className="">
				<Outlet />
			</main>
		</>
	);
}

export default Layout;