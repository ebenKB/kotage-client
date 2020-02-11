/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';

const RfxItem = ({ children, title }) => (
	<Fragment>
		<div className="content">
			{children}
			<div className="m-t-20 m-b-20 bold light-caption text-center">{title}</div>
		</div>
	</Fragment>
);

export default RfxItem;
