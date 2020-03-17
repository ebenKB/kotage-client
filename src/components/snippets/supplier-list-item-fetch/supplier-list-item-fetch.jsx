/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getSupplier } from '../../../redux/actions/tenantActions';
import SupplierListItem from '../supplier-list-item/supplier-list-item';


const SupplierListItemFetch = ({
  id, tenant_id, handleChange, isSelectAll,
}) => {
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    const FetchSupplier = async () => {
      if (!supplier) {
        const data = await getSupplier(id, tenant_id);
        setSupplier(data);
      }
    };
    FetchSupplier();
  }, [id]);
  return (
	<div>
		<SupplierListItem
			supplier={supplier}
			isSelectAll={isSelectAll}
			handleChange={() => handleChange(supplier)}
		/>
	</div>
  );
};

SupplierListItemFetch.propTypes = {
  id: PropTypes.string.isRequired,
  tenant_id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelectAll: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  tenant_id: state.user.currentUser.tenant_id,
});

export default connect(mapStateToProps, null)(SupplierListItemFetch);
