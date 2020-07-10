/* eslint-disable react/prop-types */
import React from 'react';
import './button-group.scss';

const ButtonGroup = ({ children }) => (
	<div className="kt-btn-group positive">
		{children}
	</div>
);

export default ButtonGroup;
