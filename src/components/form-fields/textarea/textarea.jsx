/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextArea } from 'semantic-ui-react';

import './kt-textarea.scss';

const KtTextArea = ({ placeholder, ...otherProps }) => (
	<div className="kt-textarea__wrapper">
		<TextArea {...otherProps} />
	</div>
);

export default KtTextArea;
