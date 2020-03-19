/* eslint-disable react/boolean-prop-naming */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getSupplier } from '../../../redux/actions/tenantActions';
import SupplierListItem from '../supplier-list-item/supplier-list-item';


const SupplierListItemFetch = ({
  uid, tenant_id, handleChange, isSelectAll, fetchSupplier,
}) => {
  const [supplier, setSupplier] = useState();

  useEffect(() => {
    const FetchSupplier = async () => {
      if (!supplier) {
        const data = await fetchSupplier(uid, tenant_id);
        setSupplier(data);
      }
    };
    FetchSupplier();
  }, [uid]);
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
  uid: PropTypes.string.isRequired,
  tenant_id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelectAll: PropTypes.bool.isRequired,
  fetchSupplier: PropTypes.func.isRequired,
};

SupplierListItemFetch.defaultProps = {
};

const mapDispatchToProps = {
  fetchSupplier: getSupplier,
};

const mapStateToProps = (state) => ({
  tenant_id: state.user.currentUser.tenant_id,
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierListItemFetch);
