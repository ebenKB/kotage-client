/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { Popup } from 'semantic-ui-react';

const PopupDropdown = () => (
	<Fragment>
		<Popup
			trigger={<span>Click me</span>}
			on="click"
			hideOnScroll
		>
			<div>
				<ul className="custom">
					<li>item one</li>
					<li>item option 2</li>
					<li>item option 3</li>
					<li>item option 4</li>
				</ul>
			</div>
		</Popup>
	</Fragment>
);

export default PopupDropdown;
