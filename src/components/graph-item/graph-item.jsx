/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import './graph-item.scss';

const GraphItem = ({ children, title }) => (
	<div className="graph-item">
		<div className="bold big-caption">{title}</div>
		<div className="m-t-20">{children}</div>
	</div>
);

GraphItem.propTypes = {
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default GraphItem;
