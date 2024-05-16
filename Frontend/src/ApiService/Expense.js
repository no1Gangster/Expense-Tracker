import axios from "axios";
import { id } from "date-fns/locale";
//Uses expense router to provide API services
class ExpenseApi {
	constructor() {
		this.api = String(import.meta.env.VITE_BACKEND_API);
	}

	//Get user expenses sorted by date
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

	//Gets user expenses of selected expense type
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

	//Posts new expense
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

	//Deletes existing expense
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

	//Gets expenses of selected month
	async getMonthExpense(month, year, userId) {
		try {
			if (userId.length == 24 && month && year) {
				let res = await axios.get(
					`${this.api}/expense/filterByMonth/${userId}?month=${month}&year=${year}`
				);
				return { data: res.data, status: true };
			}
		} catch (error) {
			console.log("Error " + error);
			return { status: false };
		}
	}

	//Gets expenses of selected year
	async getYearlyExpense(year, userId) {
		try {
			if (userId.length == 24 && year) {
				let res = await axios.get(
					`${this.api}/expense/filterByYear/${userId}?year=${year}`
				);
				return { data: res.data, status: true };
			}
		} catch (error) {
			console.log("Error " + error);
			return { status: false };
		}
	}

	//Gets expenses of given range
	async getDataRangeExpense(dateRange, userId) {
		try {
			console.log(dateRange.startDate, dateRange.endDate, userId);
			if (userId && userId.length == 24 && dateRange) {
				let res = await axios.get(
					`${this.api}/expense/filterByDates/${userId}?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
				);
				return { data: res.data, status: true };
			}
		} catch (error) {
			console.log("Error " + error);
			return { status: false };
		}
	}

	//Update given expense
	async updateExpense(updatedData, userId, expenseId) {
		try {
			if (userId.length == 24 && expenseId && updatedData) {
				let res = await axios.put(
					`${this.api}/expense/${userId}/${expenseId}`,
					updatedData
				);

				return { data: res.data, status: true };
			}
		} catch (error) {
			console.log("Error " + error);
			return { status: false, message: error.message };
		}
	}

	//Filters expense based on description
	async filterByDescription(userId, expr) {
		try {
			if (userId && userId.length == 24 && expr) {
				let res = await axios.get(`${this.api}/expense/filterByNotes/${userId}?note=${expr}`);
				return { data : res.data, status : true };
			}
		} catch (error) {
			return { status : false, message : error.message };
		}
	}
}

const expenseApi = new ExpenseApi();

export default expenseApi;
