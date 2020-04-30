/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { formatTime } from '../../utils/app/index';

export default function MaterialUIPickers({ handleChange, dateValue, timeValue }) {
  //  merge date and time to create a new Data Time object
  const getTimeFromDate = () => {
    if (!(dateValue || timeValue) || (dateValue || timeValue) === null
      || (dateValue || timeValue) === undefined) {
      return null;
    }
    const newTime = timeValue.split('.');
    return new Date(`${dateValue}T${newTime[0]}`);
  };

  const [selectedDate, setSelectedDate] = React.useState(getTimeFromDate());

  // check when the date changes
  const handleTimeChange = (time) => {
    setSelectedDate(time);
    handleChange(formatTime(time));
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
				onChange={(time) => handleTimeChange(time)}
				KeyboardButtonProps={{ 'aria-label': 'change time' }}
				placeholder="Time"
				emptyLabel=""
				invalidDateMessage="Time is not valid"
				keyboardIcon={<AccessTimeIcon />}
			/>
		</Grid>
	</MuiPickersUtilsProvider>
  );
}
