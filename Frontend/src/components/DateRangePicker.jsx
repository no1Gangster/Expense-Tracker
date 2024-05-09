<<<<<<< HEAD
import { addDays } from 'date-fns';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';

const [state, setState] = useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);

<DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={state}
  direction="horizontal"
/>;
=======
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
/>;
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
