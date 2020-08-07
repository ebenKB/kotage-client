/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';

const RfpSupplierItemWrapper = ({ children, type, classes }) => (
	<div className={`rfp-suppliers__item ${type} ${classes}`}>
		{children}
	</div>
);

RfpSupplierItemWrapper.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

RfpSupplierItemWrapper.defaultProps = {
  type: '',
};

export default RfpSupplierItemWrapper;
