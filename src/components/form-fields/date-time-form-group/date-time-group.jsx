/* eslint-disable react/prop-types */
import React from 'react'

import './date-time-group.scss';
import Input from '../input/input';

const DateTimeGroup = ({ labelName, label }) => (
	<div className="date-time-group">
		<label htmlFor={labelName}>
			<span className="bold">{label}</span>
		</label>
		<div className="date-group__content">
			<div>
				<Input
					type="date"
					placeholder="Date"
				/>
			</div>
			<div>
				<Input
					type="time"
					placeholder="Time"
				/>
			</div>
		</div>
	</div>
);

export default DateTimeGroup;
