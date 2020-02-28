/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-undef */
import React, { Fragment } from 'react';
import Input from '../input/input';
import { ReactComponent as Icon } from '../../../svg/search.svg';
import './search-field.scss';

const SearchField = () => (
	<div className="search-field">
		<Fragment>
			<Icon className="kt-logo__small icon" />
			<Input
				type="input"
				classes="fluid search tiny"
				placeholder="Enter name of vendor to search"
			/>
		</Fragment>
	</div>
);

export default SearchField;
