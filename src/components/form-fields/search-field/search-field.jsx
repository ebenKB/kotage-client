/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-undef */
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Input from '../input/input';
import { ReactComponent as Icon } from '../../../svg/search.svg';
import './search-field.scss';

const SearchField = ({ onChange, searchKey }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
	<div className="search-field">
		<Fragment>
			<Icon className="kt-logo__small icon" />
			<Input
				type="input"
				classes="fluid search tiny"
				placeholder="Enter name of vendor to search"
				onChange={handleChange}
				value={searchKey}
			/>
		</Fragment>
	</div>
  );
};

SearchField.propTypes = {
  onChange: PropTypes.func.isRequired,
  searchKey: PropTypes.string.isRequired,
};

export default SearchField;
