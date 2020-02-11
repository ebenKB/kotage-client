/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './amount.scss';
import { Dropdown } from 'semantic-ui-react';
import Input from '../input/input';

const options = [
  { key: 'GHC', text: 'GHC', value: 'GHC' },
  { key: 'USD', text: 'USD', value: 'USD' },
];

const amount = ({ name, value, ...rest }) => (
	<div className="amount-group">
		<Input
			label={<Dropdown defaultValue="GHC" options={options} className="custom" />}
			labelPosition="left"
			placeholder="Amount"
			type="number"
			name={name}
			value={value}
			min={0}
			{...rest}
		/>
	</div>
);


export default amount;
