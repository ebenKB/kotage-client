/* eslint-disable react/prop-types */
// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import './picker.scss';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ handleChange }) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleChange(date);
  };

  return (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<Grid>
			<KeyboardDatePicker
				variant="inline"
				margin="normal"
				id="date-picker-dialog"
				label=""
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{ 'aria-label': 'change date' }}
				placeholder="Select Date"
				autoOk
				invalidDateMessage={null}
				keyboardIcon={<DateRangeOutlinedIcon />}
				format="MM-dd-yyyy"
			/>
		</Grid>
	</MuiPickersUtilsProvider>
  );
}
