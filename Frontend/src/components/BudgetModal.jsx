import { addDays, format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import budget from "../ApiService/Budget";
import { useAuth } from "../Context/AuthContext";

function BudgetModal({ update, showModal, msg }) {
	//Context call
	const authContext = useAuth();
	const { id } = authContext;

	const [date, setDate] = useState([
		//Initializes start date and end date in the sidebar
		{
			startDate: addDays(new Date(), -7),
			endDate: new Date(),
			key: "selection",
		},
	]);

	const budgetRef = useRef(null);

	function toggleVisibility(val) {
		showModal(val);
	}

	async function addBudget() {
		let dateRange = [
			format(date[0].startDate, "yyyy-MM-dd"),
			format(date[0].endDate, "yyyy-MM-dd"),
		];

		let res = await budget.addBudget(
			budgetRef.current.value,
			dateRange[0],
			dateRange[1],
			id
		);
		if (res.status) {
			alert(`Budget ${msg}ed successfully`);
		} else console.log(res);

        await update();
	}

	return (
		<div
			className="modal fade show"
			style={{ display: "block" }}
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog">
				<div className="modal-content bg-dark text-light">
					<div className="modal-header">
						<h1
							className="modal-title fs-5"
							id="exampleModalLabel"
						>
							{msg} Budget
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => toggleVisibility(false)}
						></button>
					</div>
					<form onSubmit={addBudget}>
						<div className="modal-body">
							<div className="input-group mb-2 d-flex mx-auto w-75">
								<span className="input-group-text bg-dark text-light">
									₹
								</span>
								<input
									type="number"
									className="form-control bg-dark amount-enter dark-input text-light w-75"
									placeholder="Budget"
									ref={budgetRef}
									required
									min={1}
								/>
							</div>
							<div className="mb-2 d-flex justify-content-center m-0 p-0">
								<DateRange
									editableDateInputs={true}
									onChange={(item) => {
										setDate([item.selection]);
									}}
									moveRangeOnFirstSelection={false}
									ranges={date}
									displayDateFormat="yyyy-MM-dd"
									direction="vertical"
									startDatePlaceholder=""
									endDatePlaceholder=""
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								style={{ backgroundColor: "#363d44" }}
								onClick={() => toggleVisibility(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									addBudget();
                                    toggleVisibility(false);
								}}
							>
								{msg} Budget
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default BudgetModal;
