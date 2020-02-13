/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { Popup } from 'semantic-ui-react';
import './popup.scss';

const PopupDropdown = ({
  children, position, trigger = 'Click me', classes = '',
}) => (
	<Fragment>
		<Popup
			trigger={<span className="clickable">{ trigger }</span>}
			position={position}
			on="click"
			hideOnScroll
			className={classes}
		>
			<div>
				{ children }
			</div>
		</Popup>
	</Fragment>
);

export default PopupDropdown;
