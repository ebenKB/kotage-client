/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';

const SupplierBidItem = ({ bid }) => (
	<div>
		<span className="kt-primary">{bid.currency.name}</span>
		<span>{' '}</span>
		<span className="kt-primary">{bid.totalBidValue}</span>
	</div>
);

SupplierBidItem.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default SupplierBidItem;
