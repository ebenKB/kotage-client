// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('This is the date', date);
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
				onChange={handleDateChange}
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
