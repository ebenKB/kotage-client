/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextArea } from 'semantic-ui-react';

import './kt-textarea.scss';

<<<<<<< HEAD
const KtTextArea = ({placeholder,hasHeader=false, ...otherProps}) => {
  return (
	<div className="kt-textarea__wrapper">
=======
const KtTextArea = ({ placeholder, ...otherProps }) => (
	<div className="kt-textarea__wrapper">
		<div className="text-wrapper__header" />
>>>>>>> resolve more linter violations
		<TextArea {...otherProps} />
	</div>
);

export default KtTextArea;
