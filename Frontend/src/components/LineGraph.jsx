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
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="exp_date" tick={{fill:'white'}}/>
						<YAxis />
						<Tooltip labelStyle={{color : 'black'}}/>
						<Line
							connectNulls
							type="monotone"
							dataKey="amount"
							stroke="#8884d8"
							fill="#8884d8"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
