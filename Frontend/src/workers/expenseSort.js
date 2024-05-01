export default async function catgegoryWiseNet(data, exp_type) {
	let categoryExp = {
		personal: 0,
		food: 0,
		utility: 0,
		medical: 0,
		other: 0,
	};

	console.log(data)

	if (exp_type == "All") {
		data.forEach((expense) => {
			if (expense.exp_category == "personal") {
				if (expense.exp_type == "debit")
					categoryExp.personal -= expense.amount;
				else if (expense.exp_type == "credit")
					categoryExp.personal += expense.amount;
			} else if (expense.exp_category == "food") {
				if (expense.exp_type == "debit")
					categoryExp.food -= expense.amount;
				else if (expense.exp_type == "credit")
					categoryExp.food += expense.amount;
			} else if (expense.exp_category == "utility") {
				if (expense.exp_type == "debit")
					categoryExp.utility -= expense.amount;
				else if (expense.exp_type == "credit")
					categoryExp.utility += expense.amount;
			} else if (expense.exp_category == "medical") {
				if (expense.exp_type == "debit")
					categoryExp.medical -= expense.amount;
				else if (expense.exp_type == "credit")
					categoryExp.medical += expense.amount;
			} else if (expense.exp_category == "other") {
				if (expense.exp_type == "debit")
					categoryExp.other -= expense.amount;
				else if (expense.exp_type == "credit")
					categoryExp.other += expense.amount;
			}
		});
	}
	return await format(categoryExp);
}

function format(dataObj) {
	let newData = [
		{
			name: "personal",
			value: Math.abs(dataObj.personal),
			neg: dataObj.personal < 0,
		},
		{ name: "food", value: Math.abs(dataObj.food), neg: dataObj.food < 0 },
		{
			name: "utility",
			value: Math.abs(dataObj.utility),
			neg: dataObj.utility < 0,
		},
		{
			name: "medical",
			value: Math.abs(dataObj.medical),
			neg: dataObj.medical < 0,
		},
		{
			name: "other",
			value: Math.abs(dataObj.other),
			neg: dataObj.other < 0,
		},
	];

	newData = newData.filter((item) => item.value > 0);
	return newData;
}

export function expenseSplit(data) {
	let newData = data.map((item) => ({
		date: item.exp_date,
		credit: 0,
		debit: 0,
		pending: 0,
	}));

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < newData.length; j++) {
			if (data[i].exp_date === newData[j].date) {
				if (data[i].exp_type === "debit") {
					newData[j].debit = data[i].amount;
				} else if (data[i].exp_type === "credit") {
					newData[j].credit = data[i].amount;
				} else if (data[i].exp_type === "pending") {
					newData[j].pending = data[i].amount;
				}
			}
		}
	}

	// Remove duplicate entries
	for (let i = 0; i < newData.length; i++) {
		for (let j = i + 1; j < newData.length; j++) {
			if (newData[i].date === newData[j].date) {
				newData.splice(j, 1);
				j--;
			}
		}
	}

	return newData;
}
