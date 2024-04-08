import React from "react";

function ExpenseCard({ note, date, expense, type }) {
	let styled_type = type.charAt(0).toUpperCase() + type.slice(1);
	let style = {};
	let sign = "";
	if (type === "debit") {
		style = { color: "rgb(242, 139, 130)" };
		sign = "-";
	} else if (type === "credit") {
		style = { color: "rgb(0, 243, 189)" };
		sign = "+";
	} else style = { color: "rgb(89, 108, 255)" };
	return (
		<div className="container mb-3 px-2 z-3 position-relative">
			<div className="card px-md-5 card-element text-white">
				<div className="card-body">
					<div className="row">
						<div className="col">
							<h5>{note}</h5>
						</div>
						<div className="col">
							<p>{date}</p>
						</div>
						<div className="col fw-medium">
							{sign} ₹{expense}
						</div>
						<div
							className="col fw-medium"
							style={style}
						>
							{styled_type}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpenseCard;
