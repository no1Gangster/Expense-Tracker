import React from "react";

function Overview({ credit, debit, pending }) {
	return (
		<div className="p-3">
			<h2>Expense Overview</h2>
			<div className="container">
				<p className="color-red">Total Credit: {credit}</p>
				<p className="color-green">Total Debit: {debit}</p>
				<p className="color-blue">Total Pending: {pending}</p>
			</div>
		</div>
	);
}

export default Overview;
