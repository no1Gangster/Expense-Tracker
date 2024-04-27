export default async function catgegoryWiseNet(data, exp_type) {
	let categoryExp = {
		personal: 0,
		food: 0,
		utility: 0,
		medical: 0,
		other: 0,
	};

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
