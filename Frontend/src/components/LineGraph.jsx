import React, { PureComponent, useState } from "react";
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

export default function LineGraph({ data }) {
	return (
		<div
			style={{ height: "31svh" }}
			className="dark-box p-4"
		>
			<ResponsiveContainer
				width="100%"
				height="90%"
			>
				<LineChart
					width={400}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 5,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray="2 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="id"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#82ca9d"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
