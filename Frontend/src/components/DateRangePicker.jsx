import { addDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const [state, setState] = useState([
	{
		startDate: new Date(),
		endDate: addDays(new Date(), 7),
		key: "selection",
	},
]);

<DateRangePicker
	onChange={(item) => setState([item.selection])}
	showSelectionPreview={true}
	moveRangeOnFirstSelection={false}
	months={2}
	ranges={state}
	direction="horizontal"
	className="d-flex flex-column justify-content-center align-items-center m-0 p-0"
/>;
