import axios from "axios";

class Budget {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}

	async getBudgetDetails(userId) {
		try {
			let res = await axios.get(
				`${this.api}/user/${userId}/budgetStatus`
			);
			console.log(res);
			return { status: true, data: res.data };
		} catch (error) {
			console.log(error);
			return {
				status: false,
				message: "No budget data found",
				error: error.message,
			};
		}
	}

	async addBudget(budget, startDate, endDate, userId) {
		try {
			let res = await axios.put(`${this.api}/user/${userId}/budget`, {
				budget,
				startDate,
				endDate,
			});
			console.log(res);
			return { status: true, res: res.body };
		} catch (error) {
			console.log(error);
			return {
				status: false,
				message: "No budget data found",
				error: error.message,
			};
		}
	}
}

const budget = new Budget();
export default budget;
