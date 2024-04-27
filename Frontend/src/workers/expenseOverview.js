export default function expenseOverview(data) {
	let newData = { credit: 0, debit: 0, pending: 0 };

	data.forEach((data) => {
		if (data.exp_type === "credit") newData.credit += data.amount;
		if (data.exp_type === "debit") newData.debit += data.amount;
		if (data.exp_type === "pending") newData.pending += data.amount;
	});
	return newData;
}
