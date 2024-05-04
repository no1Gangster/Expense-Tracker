import axios from "axios";

class ExpenseApi {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}
	async getExpenses(id) {
		try {
			if (id.length == 24) {
				let obj = await axios.get(
					`${this.api}/expense/${id}/dateSorted`
				);
				return { data: obj.data, status: true };
			}
		} catch (error) {
			return { status: false };
		}
	}

	async getTypeData(id, type) {
		try {
			if (id.length == 24) {
				let obj = await axios.get(
					`${this.api}/expense/filterByType/${id}?type=${type}`
				);
				return { data: obj.data, status: true };
			}
		} catch (error) {
			return { status: false };
		}
	}

	async addExpense(data) {
		console.log(data);
		try {
			let obj = await axios.post(`${this.api}/expense`, data);
			console.log("Data Added");
			return { data: obj.data, status: true };
		} catch (error) {
			console.log(error);
			return { status: false };
		}
	}

	async deleteExpense(expenseId, userId) {
		console.log(expenseId, userId);
		try {
			let obj = await axios.delete(
				`${this.api}/expense/${userId}/${expenseId}`
			);
			console.log("Data Deleted Successfully");
			return { data: obj.data, status: true };
		} catch (error) {
			console.log(error);
			return { status: false };
		}
	}
}

const expenseApi = new ExpenseApi();

export default expenseApi;
