import React from 'react';
import SupplierDetailsCaption from '../supplier-details-caption/supplier-details-caption';

const SupplierDetailsCaptionGroup = () => (
	<div className="m-t-40">
		<div className="rfp-suppliers__heading m-t-20">
			<div>COMPANY</div>
			<div>STATUS</div>
		</div>
		<SupplierDetailsCaption type="active" />
		<SupplierDetailsCaption type="active" />
		<SupplierDetailsCaption type="pending" />
	</div>
);

export default SupplierDetailsCaptionGroup;
