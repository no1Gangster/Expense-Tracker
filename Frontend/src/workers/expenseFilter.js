import axios from "axios";
import expenseApi from "../ApiService/Expense";

export default async function filterExpenses(filters, id) {
	console.log(filters, id);

	let date = new Date();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	let flag = false;

	let durRes;
	let startDate;
	let endDate;

	if (filters && filters.duration == "seven") {
		let sevenDaysPrev = new Date();
		sevenDaysPrev.setDate(sevenDaysPrev.getDate() - 7);

		startDate = sevenDaysPrev.toISOString().split("T")[0];
		endDate = date.toISOString().split("T")[0];
		flag = true;
	} else if (filters && filters.duration == "month")
		durRes = await expenseApi.getMonthExpense(month, year, id);
	else if (filters && filters.duration == "year")
		durRes = await expenseApi.getYearlyExpense(year, id);
	else if (filters && filters.duration == "day") {
		flag = true;
		startDate = filters.day;
		endDate = filters.day;
	} else if (filters && filters.duration.duration == "custom") {
		startDate = filters.duration.dateRange[0];
		endDate = filters.duration.dateRange[1];
		flag = true;
	}

	let dateRange = { startDate, endDate };

	if (flag && id) {
		durRes = await expenseApi.getDataRangeExpense(dateRange, id);
	}

	let res;
	if (filters.expType == "all") res = await expenseApi.getExpenses(id);
	else res = await expenseApi.getTypeData(id, filters.expType);

	let dur;

	try {
		dur = durRes.data;
	} catch (error) {
		dur  = [];
	}
	const expenses = res.data;

	let searchData = [];
	if (filters && filters.search) {
		try {
			let searchRes = await expenseApi.filterByDescription(
				id,
				filters.search
			);
			searchData = searchRes.data;
		} catch (error) {
			console.log(error);
		}
	}

	let common = [];
	dur &&
		dur.forEach((durItem) => {
			const foundExpense = expenses.find(
				(expense) => expense._id === durItem._id
			);
			if (foundExpense) {
				common.push(durItem);
			}
		});

	console.log(common);

	if (common.length == 0) {
		common = expenses;
	}

	let foundData = [];
	if (searchData.length > 0) {
		common &&
			common.forEach((item) => {
				const commonExpense = searchData.find(
					(expense) => expense._id === item._id
				);
				if (commonExpense) {
					foundData.push(item);
				}
			});
	} else return common;

	console.log(foundData);

	return foundData;
}
