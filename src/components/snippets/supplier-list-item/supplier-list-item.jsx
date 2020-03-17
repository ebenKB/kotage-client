/* eslint-disable react/jsx-fragments */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-typos */
/* eslint-disable react/forbid-prop-types */

import React, { Fragment, useState } from 'react';
import './supplier-list-item.scss';
import { Checkbox } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

const SupplierListItem = ({
  isInline, supplier, handleChange, isSelectAll,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    if (!isSelectAll) {
      setIsChecked(!isChecked);
      handleChange(supplier);
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
	</div>
      );
    }
    return (
	<Fragment>
		{ supplier && (
			<div className="supplier-list-item m-b-5 m-t-5">
				<div className="m-r-10">
					<Checkbox
						checked={isSelectAll || isChecked}
						disabled={isSelectAll}
						onChange={() => handleOnChange()}
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
  isSelectAll: PropTypes.bool.isRequired,
};

SupplierListItem.default = {
  isSelected: false,
};
export default SupplierListItem;
