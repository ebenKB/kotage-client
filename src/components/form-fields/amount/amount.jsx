/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './amount.scss';
import { Dropdown } from 'semantic-ui-react';
import Input from '../input/input';

// const options = [
//   { key: 1, text: 'GHC', value: 1 },
//   { key: 2, text: 'USD', value: 2 },
// ];

const amount = ({
  name, inputValue, defaultSelect = 1, selectOptions, ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelect);

  const handleDropChange = ({ value }) => {
    setSelectedOption(value);
    rest.handleInputChange({
      selectedOption: selectedOption.find((f) => f.value === value),
      inputValue,
    });
  };

  return (
	<div className="amount-group">
		<Input
			label={(
				<Dropdown
					value={selectedOption}
					defaultValue={defaultSelect}
					options={selectOptions}
					onChange={(e, data) => handleDropChange(data)}
					className="custom"
				/>
			)}
			labelPosition="left"
			placeholder="Amount"
			type="number"
			name={name}
			value={inputValue}
			min={0}
			onChange={(e) => rest.handleInputChange({
			  selectedOption: selectOptions.find((f) => f.value === selectedOption),
			  inputValue: e.target.value,
			})}
			{...rest}
		/>
	</div>
  );
};

export default amount;
