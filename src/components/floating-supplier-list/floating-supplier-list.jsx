/* eslint-disable react/prop-types */
import React from 'react';
import './floating-supplier-list.scss';
import { Checkbox, Button } from 'semantic-ui-react';
import SearchField from '../form-fields/search-field/search-field';
import Divider from '../kt-divider/divider';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import { ReactComponent as Icon } from '../../svg/cancel.svg';

const FloatingSupplierList = ({ loading }) => (
	<div className="supplier-float">
		<div className="kt-wrapper__header bold big-caption light-caption">
			<div>Supplier Directory</div>
			<Icon className="icon-sm small logo" />
		</div>
		<div className="supplier-float__content">
			<SearchField />
			<div className="m-t-30">
				<Checkbox label="Select All" />
				<Divider type="thick" />
				<div className="m-t-20">
					<SupplierListItem />
					<SupplierListItem />
					<SupplierListItem />
				</div>
			</div>
		</div>
		<div className="supplier-float__footer">
			<div className="m-b-20 m-t-20">5 customers selected</div>
			<div className="supplier-float__footer-content">
				<Button
					type="submit"
					content="Add to event"
					className={`green ${loading && 'loading'}`}
				/>
			</div>
		</div>
	</div>
);

export default FloatingSupplierList;
