/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';

const RfpSupplierItemWrapper = ({ children, type, classes }) => (
	<div className={`rfp-suppliers__item ${type} ${classes}`}>
		{children}
	</div>
);

RfpSupplierItemWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default RfpSupplierItemWrapper;
