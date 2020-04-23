/* eslint-disable react/prop-types */
import React from 'react';
import './kt-wrapper-lite.scss';

const KtWrapperLite = ({ children, classes = '' }) => (
	<div className={`kt-wrapper-lite ${classes}`}>
		{children}
	</div>
);

export default KtWrapperLite;
