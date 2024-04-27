import axios from "axios";

class ExpenseApi {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}
	async getExpenses(id) {
		try {
			let obj = await axios.get(`${this.api}/expense/${id}/dateSorted`);
			return { data: obj.data, status: true };
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

	async deleteExpense(id) {
		console.log(id);
		try {
			let obj = await axios.delete(`${this.api}/expense/${import.meta.env.VITE_ROLL_NO}/${id}`);
			console.log("Data Deleted Successfully")
			return { data : obj.data, status : true};
		} catch (error) {
			console.log(error);
			return { status: false };
		}
	}
}

const expenseApi = new ExpenseApi();
export default expenseApi;
