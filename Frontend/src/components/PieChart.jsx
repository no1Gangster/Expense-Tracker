import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart({ data }) {
	const chartRef = useRef(null);

	useEffect(() => {
		if (chartRef && chartRef.current) {
			const ctx = chartRef.current.getContext("2d");

			// If there's an existing chart instance, destroy it first
			if (chartRef.current.chartInstance) {
				chartRef.current.chartInstance.destroy();
			}

			// Create new chart instance
			const newChartInstance = new Chart(ctx, {
				type: "pie",
				data: {
					labels: data.labels,
					datasets: [
						{
							label: "Pie Chart",
							data: data.values,
							backgroundColor: [
								"rgba(255, 99, 132, 0.7)",
								"rgba(54, 162, 235, 0.7)",
								"rgba(255, 206, 86, 0.7)",
								"rgba(75, 192, 192, 0.7)",
								"rgba(153, 102, 255, 0.7)",
								"rgba(255, 159, 64, 0.7)",
							],
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			});

			// Store the new chart instance in the ref
			chartRef.current.chartInstance = newChartInstance;
		}
	}, [data]);

	return <canvas ref={chartRef} />;
}

export default PieChart;
