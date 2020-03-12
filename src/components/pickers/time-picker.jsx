/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({ handleChange }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  // check when the date changes
  const handleTimeChange = (time) => {
    setSelectedDate(time);
    handleChange(time);
  };

  return (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<Grid justify="space-around" container>
			<KeyboardTimePicker
				variant="inline"
				margin="normal"
				id="time-picker"
				label=""
				value={selectedDate}
				onChange={handleTimeChange}
				KeyboardButtonProps={{ 'aria-label': 'change time' }}
				placeholder="Time"
				emptyLabel=""
				autoOk
				invalidDateMessage={null}
				keyboardIcon={<AccessTimeIcon />}
			/>
		</Grid>
	</MuiPickersUtilsProvider>
  );
}
