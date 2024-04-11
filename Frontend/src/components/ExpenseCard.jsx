import React from "react";

function ExpenseCard({ category, note, date, expense, type }) {
	let styled_type = type.charAt(0).toUpperCase() + type.slice(1);
	let style = {};
	let sign = "";
	let img_url = "";
	if (type === "debit") {
		style = { color: "rgb(242, 139, 130)" };
		sign = "-";
	} else if (type === "credit") {
		style = { color: "rgb(0, 243, 189)" };
		sign = "+";
	} else style = { color: "rgb(89, 108, 255)" };

	if (category === "food") img_url = "/food-cat.png";
	else if (category === "utility") img_url = "/utility-cat.png";
	else if (category === "personal") img_url = "/personal-cat.png";
	else if (category === "medical") img_url = "/medical-cat.png";
	else img_url = "/other-cat.png";

	return (
		<div className="container mb-3 px-2 z-3 position-relative">
			<div className="card px-md-5 card-element text-white">
				<div className="card-body">
					<div className="row">
						<div className="col">
							<img
								src={img_url}
								alt=""
								height={"50svh"}
							/>
						</div>
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
						<div className="col crud-btns">
							<div className="d-flex flex-row g-2">
								<button className="btn btn-primary mx-1 card-btns"><img src="/edit-icon.png" alt="Edit" height={"20svh"} /></button>
								<button className="btn btn-danger mx-1 card-btns"><img src="/bin-icon.png" alt="Delete" height={"20svh"} /></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpenseCard;
