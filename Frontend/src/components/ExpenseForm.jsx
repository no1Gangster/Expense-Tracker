import React, { useEffect, useRef } from "react";
import expenseApi from "../ApiService/Expense";
import { AuthContext, useAuth } from "../Context/AuthContext";

function ExpenseForm({ newExpense }) {
	//Context services
	let authContext = useAuth();
	let { id } = authContext;

	const noteRef = useRef(null);
	const amtRef = useRef(null);
	const dateRef = useRef(null);
	const typeRef = useRef(null);
	const catRef = useRef(null);

	async function setDate() {
		let todays_date = await String(new Date().toJSON().slice(0, 10));
		dateRef.current.value = todays_date;
	}
	
	useEffect(()=> {
		setDate();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		let obj = {
			userId: id,
			note: noteRef.current.value,
			amount: amtRef.current.value,
			exp_date: dateRef.current.value,
			exp_type: typeRef.current.value,
			exp_category: catRef.current.value,
		};
		let res = await expenseApi.addExpense(obj);

		res.status ? console.log("\nData Added") : console.log(res.status);

		newExpense();

		noteRef.current.value = null;
		amtRef.current.value = null;
	}
	return (
		<div className="form-dock rounded-2 mx-2 w-auto mt-md-2 p-2 text-white bg-vary">
			<form
				method="post"
				onSubmit={handleSubmit}
			>
				<div className="row text-center overflow-hidden g-2">
					<div className="col">
						<div>
							<input
								type="text"
								className="form-control bg-dark dark-input"
								placeholder="Description"
								ref={noteRef}
								required
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div>
							<select
								className="form-select bg-dark dark-input text-light"
								ref={catRef}
							>
								<option value="personal">Personal</option>
								<option value="food">Food</option>
								<option value="utility">Utility</option>
								<option value="medical">Medical</option>
								<option value="other">Other...</option>
							</select>
						</div>
					</div>
					<div className="col">
						<div className="input-group">
							<span className="input-group-text bg-dark text-light">
								₹
							</span>
							<input
								type="number"
								className="form-control bg-dark amount-enter dark-input text-light"
								placeholder="Amount"
								ref={amtRef}
								required
								min={1}
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div>
							<input
								type="date"
								className="form-control bg-dark dark-input date-inp"
								ref={dateRef}
								required
							/>
						</div>
					</div>
					<div className="col-lg-2">
						<div>
							<select
								className="form-select bg-dark dark-input"
								ref={typeRef}
							>
								<option value="debit">Debit</option>
								<option value="credit">Credit</option>
								<option value="pending">Pending</option>
							</select>
						</div>
					</div>
					<div className="col-1">
						<input
							type="submit"
							className="btn btn-success"
							value="Add Expense"
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ExpenseForm;
