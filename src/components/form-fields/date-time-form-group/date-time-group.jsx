/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker from '../../pickers/date-picker';
import TimePicker from '../../pickers/time-picker';

import './date-time-group.scss';
// import Input from '../input/input';

const DateTimeGroup = ({
  labelName, label, onDateChange, onTimeChange,
}) => (
	<div className="date-time-group">
		<label htmlFor={labelName}>
			<span className="">{label}</span>
		</label>
		<div className="date-group__content">
			<div>
				<DatePicker
					handleChange={(data) => onDateChange(data)}
				/>
				{/* <Input
					type="date"
					placeholder="Date"
				/> */}
			</div>
			<div>
				{/* <Input
					type="time"
					placeholder="Time"
				/> */}
				<TimePicker
					handleChange={(data) => onTimeChange(data)}
				/>
			</div>
		</div>
	</div>
);

export default DateTimeGroup;
