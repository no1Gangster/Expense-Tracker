import React, { useRef } from "react";

function ExpenseForm() {
	const noteRef = useRef(null);
	const amtRef = useRef(null);
	const dateRef = useRef(null);
	const typeRef = useRef(null);
	function handleSubmit(e) {
        e.preventDefault();
        let obj = {note : noteRef.current.value,
                    amount : amtRef.current.value,
                    date : dateRef.current.value,
                    type : typeRef.current.value};
		console.log(obj);

        noteRef.current.value = null
        amtRef.current.value = null
        dateRef.current.value = null
	}
	return (
		<div className="form-dock rounded-2 mt-2 p-2 text-white">
			<form
				method="post"
				onSubmit={handleSubmit}
			>
				<div className="row text-center overflow-hidden g-2">
					<div className="col">
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="Description"
								ref={noteRef}
							/>
						</div>
					</div>
					<div className="col">
						<div className="input-group">
							<span className="input-group-text">₹</span>
							<input
								type="number"
								className="form-control"
								placeholder="Amount"
								ref={amtRef}
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div>
							<input
								type="date"
								className="form-control"
								ref={dateRef}
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div>
							<select
								className="form-select"
								ref={typeRef}
							>
								<option value="debit">Debit</option>
								<option value="credit">Credit</option>
								<option value="pending">Pending</option>
							</select>
						</div>
					</div>
					<div className="col-1">
						<div>
							<input
								type="submit"
								className="btn btn-success"
								value="Add Expense"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ExpenseForm;
