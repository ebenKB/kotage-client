/* eslint-disable react/prop-types */
import React from 'react';
import DatePicker from '../../pickers/date-picker';
import TimePicker from '../../pickers/time-picker';

import './date-time-group.scss';
// import Input from '../input/input';

const DateTimeGroup = ({ labelName, label }) => (
	<div className="date-time-group">
		<label htmlFor={labelName}>
			<span className="">{label}</span>
		</label>
		<div className="date-group__content">
			<div>
				<DatePicker />
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
				<TimePicker />
			</div>
		</div>
	</div>
);

export default DateTimeGroup;
