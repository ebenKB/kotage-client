/* eslint-disable react/forbid-prop-types */
// import 'date-fns';
import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import './picker.scss';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { formatDate } from '../../utils/app/index';

export default function MaterialUIPickers({ handleChange, isDisablePast, value = null }) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(value);

  const handleDateChange = (date) => {
    const newDate = formatDate(date); // for date for saving
    setSelectedDate(date);
    handleChange(newDate);
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
				invalidDateMessage="Invalid Date"
				minDateMessage="selected date is before today."
				keyboardIcon={<DateRangeOutlinedIcon />}
				format="MM-dd-yyyy"
				disablePast={isDisablePast}
			/>
		</Grid>
	</MuiPickersUtilsProvider>
  );
}

MaterialUIPickers.propTypes = {
  isDisablePast: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

MaterialUIPickers.defaultProps = {
  isDisablePast: true,
  value: null,
};
