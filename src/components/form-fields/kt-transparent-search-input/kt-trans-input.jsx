/* eslint-disable react/prop-types */
import React from 'react';
import { Input } from 'semantic-ui-react';
import './kt-trans-input.scss';


const KtTransparentInput = ({ classes }) => (
	<Input
		icon="search"
		placeholder="Enter Supplier"
		iconPosition="left"
		className={`${classes}`}
	/>
);

export default KtTransparentInput;
