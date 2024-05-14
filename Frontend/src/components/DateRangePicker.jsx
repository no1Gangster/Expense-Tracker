<<<<<<< HEAD
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
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
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
<<<<<<< HEAD
>>>>>>> ce1ca56ef88afa355cc5e120e01c45ff0f313a92
=======
>>>>>>> 5607fd0bcda78b0af9f695ec7ada06aef0e302c4
