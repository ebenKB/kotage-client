/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { ReactComponent as LinkIcon } from '../../svg/link.svg';
import './graph-item.scss';

const GraphItem = ({ children, title }) => (
	<div className="graph-item">
		<div className="bold medium-caption">
			{title}
			<LinkIcon className="caption-icon m-l-5 small logo" />
		</div>
		<div className="m-t-20">{children}</div>
	</div>
);

GraphItem.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default GraphItem;