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
			<div style={{ width: "100%" }}>
				<ResponsiveContainer
					width="100%"
					height={200}
				>
					<LineChart
						width={500}
						height={200}
						data={data}
						margin={{
							top: 10,
							right:50,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" tick={{fill:'white'}}/>
						<YAxis />
						<Tooltip labelStyle={{color : 'black'}}/>
						<Line
							connectNulls
							type="monotone"
							dataKey="debit"
							stroke="#f28b82"
							fill="#f28b82"
						/>
						<Line
							connectNulls
							type="monotone"
							dataKey="credit"
							stroke="#00f3bd"
							fill="#00f3bd"
						/>
						<Line
							connectNulls
							type="monotone"
							dataKey="pending"
							stroke="#596cff"
							fill="#596cff"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
