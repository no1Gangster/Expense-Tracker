import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Sidebar.css";

function Sidebar() {
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: "selection",
		},
	]);

	// useEffect(() => {
	// 	console.log(
	// 		format(date[0].startDate, "yyyy-MM-dd") +
	// 			"\n" +
	// 			format(date[0].endDate, "yyyy-MM-dd")
	// 	);
	// }, [date]);

	return (
		<div className="ms-3 pt-2" style={{height:"4svh", width:"2svw"}}>
			<a
				className="btn btn-light"
				data-bs-toggle="offcanvas"
				href="#offcanvasExample"
				role="button"
				aria-controls="offcanvasExample"
			>
				Filters
			</a>

			<div
				className="offcanvas offcanvas-start text-bg-dark"
				tabIndex="-1"
				id="offcanvasExample"
				aria-labelledby="offcanvasExampleLabel"
			>
				<div className="offcanvas-header" data-bs-theme="dark">
					<h5
						className="offcanvas-title"
						id="offcanvasExampleLabel"
					>
						Filters
					</h5>
					<button
						type="button"
						className="btn-close"
						data-bs-dismiss="offcanvas"
						aria-label="Close"
                        color=""
					></button>
				</div>
				<div className="offcanvas-body">
					<div>Select Expense Type:</div>
					<br />
					<div>
						<form
							action=""
							className=""
						>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="flexRadioDefault"
									defaultChecked
								/>
								<label className="form-check-label color-red">
									Debit
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="flexRadioDefault"
								/>
								<label className="form-check-label color-green">
									Credit
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="flexRadioDefault"
								/>
								<label className="form-check-label color-blue">
									Pending
								</label>
							</div>
							<br />
							<br />
							<p>Select Date Range:</p>
							<div>
								<DateRange
									editableDateInputs={true}
									onChange={(item) => {
										setDate([item.selection]);
									}}
									moveRangeOnFirstSelection={false}
									ranges={date}
									displayDateFormat="yyyy-MM-dd"
									direction="vertical"
								/>
							</div>
                            <br />
                            <br />
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control dark-input bg-dark"
									placeholder="Description"
									aria-label="Recipient's username"
									aria-describedby="button-addon2"
								/>
								<button
									className="btn btn-primary"
									type="button"
									id="button-addon2"
								>
									<img src="/search-icon-white.png" alt="" width={"15svw"} />
								</button>
							</div>
							<div>
								<input type="submit" className="btn btn-success" value="Apply Filters"/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
