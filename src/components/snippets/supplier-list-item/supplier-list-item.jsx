/* eslint-disable import/no-unresolved */
import React from 'react';
import './supplier-list-item.scss';
import { Checkbox } from 'semantic-ui-react';

const SupplierListItem = () => (
	<div className="supplier-list-item m-b-5 m-t-5">
		<div className="m-r-10">
			<Checkbox />
		</div>
		<div>
			<h2 className="kt-primary">Company Name</h2>
			<div className="sm-caption light-caption">example@email.com</div>
		</div>
	</div>
);

export default SupplierListItem;
