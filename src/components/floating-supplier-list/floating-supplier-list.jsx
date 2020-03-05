/* eslint-disable react/prop-types */
import React from 'react';
import './floating-supplier-list.scss';
import { Checkbox, Button } from 'semantic-ui-react';
import SearchField from '../form-fields/search-field/search-field';
import Divider from '../kt-divider/divider';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import { ReactComponent as Icon } from '../../svg/close.svg';

const FloatingSupplierList = ({ loading, isVisible, closeForm }) => {
  const handleClose = () => {
    closeForm();
  };

  return (
	<div className={`supplier-float ${isVisible ? 'show' : 'hide'}`}>
		<div className="supplier-float__body">
			<div className="kt-wrapper__header bold big-caption light-caption">
				<div>Supplier Directory</div>
				<Button
					onClick={handleClose}
					className="kt-transparent"
				>
					<Icon className="icon-sm small logo" />
				</Button>
			</div>
			<div className="supplier-float__content">
				<SearchField />
				<div className="m-t-30">
					<Checkbox label="Select All" />
					<Divider type="thick" />
					<div className="m-t-20">
						<SupplierListItem supplier={{}} />
						<SupplierListItem supplier={{}} />
						<SupplierListItem supplier={{}} />
					</div>
				</div>
			</div>
		</div>
		<div className="kt-wrapper__header supplier-float__footer">
			<div className="supplier-float__footer-content">
				<Button
					type="submit"
					content="Add 5 suppliers to event"
					className={`fluid green ${loading && 'loading'}`}
				/>
			</div>
		</div>
	</div>
  );
};

export default FloatingSupplierList;
