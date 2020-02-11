/* eslint-disable react/prop-types */
import React from 'react';
import Input from '../input/input';

const DatePicker = ({ placeholder }) => (
	<div>
		<Input
			type="date"
			placeholder={placeholder}
		/>
		<span className="open-button">
      icon here
		</span>
	</div>
);

export default DatePicker;
