/* eslint-disable react/prop-types */
import React from 'react';
import { ReactComponent as Logo } from '../../../svg/cancel.svg';

import './error-icon.scss';

const ErrorIcon = ({ error, classes }) => (
	<div className="field-error">
		<Logo className={classes} />
		{error}
	</div>
);

export default ErrorIcon;
