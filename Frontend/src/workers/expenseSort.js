<<<<<<< HEAD
<<<<<<< HEAD
=======

//Finds net expense for each category
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======

//Finds net expense for each category
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
export default async function catgegoryWiseNet(data, exp_type) {
	let categoryExp = {
		personal: 0,
		food: 0,
		utility: 0,
		medical: 0,
		other: 0,
	};

	if (exp_type == "credit" || exp_type == "debit" || exp_type == "pending") {
		data.forEach((expense) => {
<<<<<<< HEAD
<<<<<<< HEAD
			if (expense.exp_category == "personal") categoryExp.personal += expense.amount
			if (expense.exp_category == "food") categoryExp.food += expense.amount
			if (expense.exp_category == "utility") categoryExp.utility += expense.amount
			if (expense.exp_category == "medical") categoryExp.medical += expense.amount
			if (expense.exp_category == "other") categoryExp.other += expense.amount
		})
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			if (expense.exp_category == "personal")
				categoryExp.personal += expense.amount;
			if (expense.exp_category == "food")
				categoryExp.food += expense.amount;
			if (expense.exp_category == "utility")
				categoryExp.utility += expense.amount;
			if (expense.exp_category == "medical")
				categoryExp.medical += expense.amount;
			if (expense.exp_category == "other")
				categoryExp.other += expense.amount;
		});
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	} else {
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//Formats data into PieChart component usable form
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
//Formats data into PieChart component usable form
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//Filters out total of each expense type for each date
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
//Filters out total of each expense type for each date
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
export function expenseTypeWiseSplit(data) {
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
<<<<<<< HEAD
<<<<<<< HEAD
					newData[j].debit = data[i].amount;
				} else if (data[i].exp_type === "credit") {
					newData[j].credit = data[i].amount;
				} else if (data[i].exp_type === "pending") {
					newData[j].pending = data[i].amount;
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
					newData[j].debit += data[i].amount;
				} else if (data[i].exp_type === "credit") {
					newData[j].credit += data[i].amount;
				} else if (data[i].exp_type === "pending") {
					newData[j].pending += data[i].amount;
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
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
