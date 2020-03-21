/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-typos */
/* eslint-disable react/forbid-prop-types */

import React, { Fragment, useState } from 'react';
import './supplier-list-item.scss';
import { Checkbox } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import DeleteButton from '../../buttons/delete-button';

const SupplierListItem = ({
  isInline, supplier, handleChange, isSelectAll, deleteSupplier,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    if (!isSelectAll) {
      console.log('This supplier changes', supplier);
      handleChange(supplier);
      setIsChecked(!isChecked);
    }
  };
  const getForm = () => {
    if (isInline) {
      return (
	<div className="inline supplier-list__item">
		<div className="bold">
			{ supplier && supplier.company_name }
		</div>
		<div>{supplier.email}</div>
		<div>
			<DeleteButton
				type="icon"
				classes="cta"
				handleAction={() => deleteSupplier(supplier.supplier_id)}
			/>
		</div>
	</div>
      );
    }
    return (
	<Fragment>
		{ supplier && (
			<div className="supplier-list__item m-b-5 m-t-5">
				<div className="m-r-10">
					<Checkbox
						checked={isSelectAll || isChecked}
						disabled={isSelectAll}
						onChange={(e) => handleOnChange(e)}
					/>
				</div>
				<div>
					<h2 className="kt-primary">{supplier.company_name}</h2>
					<div className="sm-caption light-caption">{supplier.email}</div>
				</div>
			</div>
		)}
	</Fragment>
    );
  };

  return (
	<div>
		{
      getForm()
    }
	</div>
  );
};

SupplierListItem.propTypes = {
  isInline: PropTypes.bool,
  supplier: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelectAll: PropTypes.bool,
  deleteSupplier: PropTypes.func.isRequired,
};

SupplierListItem.default = {
  isSelected: false,
};
export default SupplierListItem;
