import React from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
} from "recharts";

export default function LineGraph({ data, dateData }) {
	const handleChartClick = (event) => {
		if (event && event.activePayload && event.activePayload[0]) {
			const { payload } = event.activePayload[0];
			console.log(payload.date); // Logging the clicked value
			dateData({
				duration: "day",
				expType: "all",
				search: "",
				day: payload.date,
			});
		}
	};

	return (
		<div
			style={{ height: "300px" }}
			className="dark-box p-4 cp"
		>
			<ResponsiveContainer
				width="100%"
				height="100%"
			>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 10,
						right: 50,
						left: 0,
						bottom: 30,
					}}
					onClick={handleChartClick}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						style={{ cursor: "pointer" }}
					/>
					<XAxis
						dataKey="date"
						tick={{ fill: "white" }}
					/>
					<YAxis />
					<Tooltip
						contentStyle={{
							backgroundColor: "#212529",
							color: "#ffffff",
						}}
					/>
					<Line
						connectNulls
						type="monotone"
						dataKey="debit"
						stroke="#f28b82"
						fill="#f28b82"
						name="Debit"
					/>
					<Line
						connectNulls
						type="monotone"
						dataKey="credit"
						stroke="#00f3bd"
						fill="#00f3bd"
						name="Credit"
					/>
					<Line
						connectNulls
						type="monotone"
						dataKey="pending"
						stroke="#596cff"
						fill="#596cff"
						name="Pending"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
