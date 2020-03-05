/* eslint-disable react/require-default-props */
/* eslint-disable react/no-typos */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import './supplier-list-item.scss';
import { Checkbox } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

const SupplierListItem = ({ isInline, supplier }) => {
  const getForm = () => {
    if (isInline) {
      return (
	<div className="inline supplier-list__item">
		<div className="bold">
      MTN GHANA
			{' '}
			{ supplier && supplier.name }
		</div>
		<div>example@email.com</div>
	</div>
      );
    }
    return (
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
};


export default SupplierListItem;
