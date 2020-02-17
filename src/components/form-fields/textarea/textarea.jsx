
/* eslint-disable react/prop-types */
import React from 'react';
import { TextArea } from 'semantic-ui-react';

import './kt-textarea.scss';

const KtTextArea = ({
  placeholder, onChange, rows,
}) => (
	<div className="kt-textarea__wrapper">
		<TextArea
			placeholder={placeholder}
			onChange={(e, data) => onChange(data.value)}
			rows={rows}
		/>
	</div>
);

export default KtTextArea;
