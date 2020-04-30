/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker from '../../pickers/date-picker';
import TimePicker from '../../pickers/time-picker';

import './date-time-group.scss';
// import Input from '../input/input';

const DateTimeGroup = ({
  labelName,
  label,
  onDateChange,
  onTimeChange,
  dateValue,
  timeValue,
  isDisablePast,
}) => (
	<div className="date-time-group">
		<label htmlFor={labelName}>
			<span className="">{label}</span>
		</label>
		<div className="date-group__content">
			<div>
				<DatePicker
					isDisablePast={isDisablePast}
					handleChange={(data) => onDateChange(data)}
					value={dateValue}
				/>
			</div>
			<div>
				<TimePicker
					handleChange={(data) => onTimeChange(data)}
					dateValue={dateValue}
					timeValue={timeValue}
				/>
			</div>
		</div>
	</div>
);

export default DateTimeGroup;
