// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import './picker.scss';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date(null));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<Grid justify="space-around">
			<KeyboardDatePicker
				variant="inline"
				margin="normal"
				id="date-picker-dialog"
				label=""
				format="MM/dd/yyyy"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{ 'aria-label': 'change date' }}
			/>
		</Grid>
	</MuiPickersUtilsProvider>
  );
}
