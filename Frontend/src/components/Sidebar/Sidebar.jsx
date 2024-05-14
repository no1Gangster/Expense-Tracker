import { addDays, format } from "date-fns";
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
import { useEffect, useRef, useState } from "react";
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Sidebar.css";

<<<<<<< HEAD
<<<<<<< HEAD
function Sidebar({ returnExpType }) {
	const [expType, setExpType] = useState("all");

	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
function Sidebar({ filters }) {
	const [expType, setExpType] = useState("all");
	const [duration, setDuration] = useState("all");

	const searchRef = useRef(null);

	const [date, setDate] = useState([
		//Initializes start date and end date in the sidebar
		{
			startDate: addDays(new Date(), -7),
			endDate: new Date(),
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
			key: "selection",
		},
	]);

	function showValue(e) {
		setExpType(e.target.value);
	}

<<<<<<< HEAD
<<<<<<< HEAD
	function handleSubmit(e) {
		e.preventDefault();
		returnExpType(expType);
	}

	// useEffect(() => {
	// 	console.log(
	// 		format(date[0].startDate, "yyyy-MM-dd") +
	// 			"\n" +
	// 			format(date[0].endDate, "yyyy-MM-dd")
	// 	);
	// }, [date]);
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
	function changeDuration(e) {
		setDuration(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		let dateRange = [
			format(date[0].startDate, "yyyy-MM-dd"),
			format(date[0].endDate, "yyyy-MM-dd"),
		];

		if (duration == "custom")
			filters({
				//Returns data object for custom date filter
				expType: expType,
				duration: { duration, dateRange },
				search: searchRef.current.value,
			});
		else filters({ expType, duration, search: searchRef.current.value }); //Returns data object for remaining data filters
	}
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4

	return (
		<div
			className="ms-3 pt-2"
			style={{ height: "4svh", width: "2svw" }}
		>
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
				<div
					className="offcanvas-header"
					data-bs-theme="dark"
				>
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
<<<<<<< HEAD
<<<<<<< HEAD
					<div>Select Expense Type:</div>
					<br />
					<div>
						<form onSubmit={handleSubmit}>
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
					<div>
						<form onSubmit={handleSubmit}>
							<div>Select Expense Type:</div>
							<br />
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="ExpType"
									checked={expType === "all"}
									onChange={showValue}
									value={"all"}
<<<<<<< HEAD
<<<<<<< HEAD
									defaultChecked
=======
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
								/>
								<label className="form-check-label color-light">
									All
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={expType === "debit"}
									onChange={showValue}
									value={"debit"}
									name="ExpType"
								/>
								<label className="form-check-label color-red">
									Debit
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={expType === "credit"}
									onChange={showValue}
									value={"credit"}
									name="ExpType"
								/>
								<label className="form-check-label color-green">
									Credit
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={expType === "pending"}
									onChange={showValue}
									value={"pending"}
									name="ExpType"
								/>
								<label className="form-check-label color-blue">
									Pending
								</label>
							</div>
							<br />
							<br />
<<<<<<< HEAD
<<<<<<< HEAD
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
									startDatePlaceholder=""
									endDatePlaceholder=""
								/>
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
							<p>Select Duration:</p>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="ExpDuration"
									checked={duration === "seven"}
									onChange={changeDuration}
									value={"seven"}
								/>
								<label className="form-check-label color-light">
									Last Seven Days
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={duration === "month"}
									onChange={changeDuration}
									value={"month"}
									name="ExpDuration"
								/>
								<label className="form-check-label color-red">
									Last Month
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={duration === "year"}
									onChange={changeDuration}
									value={"year"}
									name="ExpDuration"
								/>
								<label className="form-check-label color-green">
									Last Year
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									checked={duration === "custom"}
									onChange={changeDuration}
									value={"custom"}
									name="ExpDuration"
								/>
								<label className="form-check-label color-blue">
									Custom Date Range
								</label>
							</div>
							<div>
								{duration === "custom" && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => {
											setDate([item.selection]);
										}}
										moveRangeOnFirstSelection={false}
										ranges={date}
										displayDateFormat="yyyy-MM-dd"
										direction="vertical"
										startDatePlaceholder=""
										endDatePlaceholder=""
									/>
								)}
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
							</div>
							<br />
							<br />
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control dark-input bg-dark"
<<<<<<< HEAD
<<<<<<< HEAD
=======
									ref={searchRef}
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
									ref={searchRef}
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
									placeholder="Description"
									aria-label="Recipient's username"
									aria-describedby="button-addon2"
								/>
								<button
									className="btn btn-primary"
									type="button"
									id="button-addon2"
								>
									<img
										src="/search-icon-white.png"
										alt=""
										width={"15svw"}
									/>
								</button>
							</div>
							<div>
								<input
<<<<<<< HEAD
<<<<<<< HEAD
									type="submit"
									className="btn btn-success"
									value="Apply Filters"
=======
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
									type="reset"
									value="Clear"
									className="btn btn-danger me-2"
									onClick={() => {
										setDuration("all");
										setExpType("all");
									}}
								/>
								<input
									type="submit"
									className="btn btn-success"
									value="Apply Filters"
									data-bs-dismiss="offcanvas"
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
