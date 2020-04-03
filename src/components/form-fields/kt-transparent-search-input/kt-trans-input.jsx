/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import './kt-trans-input.scss';

const KtTransparentInput = ({ classes, handleSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputValue(() => value);
    handleSearch(value);
  };

  return (
	<Input
		icon="search"
		placeholder="Enter Supplier"
		iconPosition="left"
		className={`${classes}`}
		onChange={handleInputChange}
		value={inputValue}
		name="search"
	/>
  );
};

export default KtTransparentInput;
