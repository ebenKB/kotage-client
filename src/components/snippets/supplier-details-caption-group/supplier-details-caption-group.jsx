import React from 'react';
import { PropTypes } from 'prop-types';
import SupplierDetailsCaption from '../supplier-details-caption/supplier-details-caption';
import Divider from '../../kt-divider/divider';

const SupplierDetailsCaptionGroup = ({ suppliers }) => (
	<div className="m-t-40">
		<div className="rfp-suppliers__heading m-t-20">
			<div>COMPANY</div>
			<div>STATUS</div>
		</div>
		<Divider type="faint" title="" classes="m-t-4" />
		{suppliers && suppliers.map((supplier) => (
			<div>
				<SupplierDetailsCaption
					type={`${supplier.submission_date !== null ? 'active' : 'pending'}`}
					supplier={supplier}
				/>
			</div>
		))}
	</div>
);

SupplierDetailsCaptionGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suppliers: PropTypes.object.isRequired,
};

export default SupplierDetailsCaptionGroup;
