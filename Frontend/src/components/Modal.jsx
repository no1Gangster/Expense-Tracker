import React, { useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import expenseApi from "../ApiService/Expense";

function Modal({ showModal, data, update }) {
	const authContext = useAuth();
	const { id } = authContext;

	const noteRef = useRef(null);
	const catRef = useRef(null);
	const amtRef = useRef(null);
	const dateRef = useRef(null);
	const typeRef = useRef(null);

	async function updateExpense(e) {
		e.preventDefault();

		//Update Expense
		let updatedData = {
			_id: data._id,
			userId: id,
			amount: amtRef.current.value,
			exp_date: dateRef.current.value,
			exp_category: catRef.current.value,
			exp_type: typeRef.current.value,
			note: noteRef.current.value,
		};

		let res = await expenseApi.updateExpense(updatedData, id, data._id);
		await toggleVisibility(false);

		res.status
			? alert("Expense Updated Successfully")
			: alert("Failed to update expense");

		update();
	}

	function toggleVisibility(val) {
		showModal(val);
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
							Update Expense
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => toggleVisibility(false)}
						></button>
					</div>
					<form onSubmit={updateExpense}>
						<div className="modal-body">
							<div className="mb-2">
								<input
									type="text"
									className="form-control bg-dark dark-input text-light"
									placeholder="Description"
									ref={noteRef}
									defaultValue={data.note}
									required
								/>
							</div>
							<div className="mb-2">
								<select
									className="form-select bg-dark dark-input text-light"
									ref={catRef}
									defaultValue={data.category}
								>
									<option value="personal">Personal</option>
									<option value="food">Food</option>
									<option value="utility">Utility</option>
									<option value="medical">Medical</option>
									<option value="other">Other...</option>
								</select>
							</div>
							<div className="input-group mb-2">
								<span className="input-group-text bg-dark text-light">
									₹
								</span>
								<input
									type="number"
									className="form-control bg-dark amount-enter dark-input text-light"
									placeholder="Amount"
									defaultValue={data.expense}
									ref={amtRef}
									required
									min={1}
								/>
							</div>
							<div className="mb-2">
								<input
									type="date"
									className="form-control bg-dark dark-input date-inp text-light"
									defaultValue={data.date}
									ref={dateRef}
									required
								/>
							</div>
							<div>
								<select
									className="form-select bg-dark dark-input text-light"
									defaultValue={data.type}
									ref={typeRef}
								>
									<option value="debit">Debit</option>
									<option value="credit">Credit</option>
									<option value="pending">Pending</option>
								</select>
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
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={updateExpense}
							>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Modal;
