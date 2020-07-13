import React from 'react';
import { PropTypes } from 'prop-types';
import SupplierDetailsCaption from '../supplier-details-caption/supplier-details-caption';

const SupplierDetailsCaptionGroup = ({ suppliers }) => (
	<div className="m-t-40">
		<div className="rfp-suppliers__heading m-t-20">
			<div>COMPANY</div>
			<div>STATUS</div>
		</div>
		<SupplierDetailsCaption type="active" />
		<SupplierDetailsCaption type="active" />
		<SupplierDetailsCaption type="pending" />
		{suppliers && suppliers.map((s) => (
			<div>
				<SupplierDetailsCaption type="active" />
				<span>{s.name}</span>
			</div>
		))}
	</div>
);

SupplierDetailsCaptionGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suppliers: PropTypes.object.isRequired,
};

export default SupplierDetailsCaptionGroup;
