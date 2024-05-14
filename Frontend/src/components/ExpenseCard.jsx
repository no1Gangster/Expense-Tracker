import React, { useContext, useEffect, useRef, useState } from "react";
import expenseApi from "../ApiService/Expense";
import { AuthContext } from "../Context/AuthContext";
import Modal from "./Modal";

function ExpenseCard({ category, note, date, expense, type, _id, update }) {
	//Get Context Variables
	let authContext = useContext(AuthContext);
	let { id } = authContext;

	let styled_type = type.charAt(0).toUpperCase() + type.slice(1);
	let style = {};
	let sign = "";
	let img_url = "";

	//Set Expense Colour
	if (type === "debit") {
		style = { color: "rgb(242, 139, 130)" };
		sign = "-";
	} else if (type === "credit") {
		style = { color: "rgb(0, 243, 189)" };
		sign = "+";
	} else style = { color: "rgb(89, 108, 255)" };

	//Set Category Image
	if (category === "food") img_url = "/food-cat.png";
	else if (category === "utility") img_url = "/utility-cat.png";
	else if (category === "personal") img_url = "/personal-cat.png";
	else if (category === "medical") img_url = "/medical-cat.png";
	else img_url = "/other-cat.png";

	//Delete Expense
	async function deleteExpense(expenseId, userId) {
		let res = await expenseApi.deleteExpense(expenseId, userId);
		res.status ? console.log("Delete Successfully") : console.log("Error");
		update();
	}

	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState({});

	function updateExpense() {
		setData({
			category,
			note,
			date,
			expense,
			type,
			_id,
		});
		setShowModal(true);
	}

	return (
		<>
			{showModal && <Modal data={data} showModal={setShowModal} update={update} />}
			<div className="container mb-3 px-2 z-3 position-relative">
				<div className="card px-md-5 card-element text-white">
					<div className="card-body">
						<div className="row">
							<div className="col d-flex w-50">
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
									<button
										className="btn btn-primary mx-1 card-btns"
										onClick={updateExpense}
									>
										<img
											src="/edit-icon.png"
											alt="Edit"
											height={"20svh"}
										/>
									</button>
									<button
										className="btn btn-danger mx-1 card-btns"
										onClick={() => {
											deleteExpense(_id, id);
										}} //deleteExpense(expense._id, user.id)
									>
										<img
											src="/bin-icon.png"
											alt="Delete"
											height={"20svh"}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ExpenseCard;
