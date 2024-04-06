import React from "react";

function Overview({ credit, debit, pending }) {
	return (
		<>
			<h2>Expense Overview</h2>
			<div className="container">
				<p>Total Credit: {credit}</p>
				<p>Total Debit: {debit}</p>
				<p>Total Pending: {pending}</p>
			</div>
		</>
	);
}

export default Overview;
