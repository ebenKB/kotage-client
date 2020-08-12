/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Divider from '../kt-divider/divider';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import FloatingSupplierList from '../floating-supplier-list/floating-supplier-list';
import './supplier-directory-section.scss';

const SupplierDirectorySection = ({
  proposal, existingSuppliers, deleteSupplier, addSupplier,
}) => {
  const [canShowSuppliers, setShowSuppliers] = useState(false);

  const hideSuppliers = () => {
    setShowSuppliers(false);
  };

  const handleAddSuppliers = (suppliers) => {
    addSupplier(suppliers);
    setShowSuppliers(false);
  };

  // use this function to open the floating supplier directory to select suppliers
  const openSupplierDirectory = () => {
    setShowSuppliers(true);
  };
  return (
	<div>
		<div className="flex-inline m-t-20 m-b-30">
			<div>Open your supplier directory to add suppliers</div>
			<div className="">
				<Button
					onClick={openSupplierDirectory}
					className="flex-center kt-transparent kt-primary clickable m-t-20 kt-primary bold sm-caption flex-center"
				>
					<span className="kt-primary">Open Supplier Directory</span>
				</Button>
				{canShowSuppliers && (
					<FloatingSupplierList
						suppliers={existingSuppliers}
						isVisible={canShowSuppliers}
						closeForm={hideSuppliers}
						handleAction={(suppliers) => handleAddSuppliers(suppliers)}
					/>
				)}
			</div>
		</div>
		{proposal.suppliers && proposal.suppliers.length > 0 && (
			<div>
				<div className="bold faint-caption m-t-8 m-b-8">
					{ proposal.suppliers.length }
					{' '}
					ADDED SUPPLIER(S)
				</div>
				<Divider type="thick" title="" classes="m-t-8" isNumbered={false} />
				<div className="xsm-caption supplier-content__heading faint-caption m-t-8 m-b-8">
					<div>
						<div>SUPPLIER NAME</div>
					</div>
					<div>CONTACT</div>
				</div>
				<Divider type="thick" title="" classes="m-t-8" isNumbered={false} />
				<div className="items-group underline bottom">
					{/* use this when we do not need to fetch the supplier record */}
					{proposal.suppliers && (proposal.suppliers.map((supplier) => (
						<SupplierListItem
							isInline
							supplier={supplier}
							key={supplier.id}
							deleteSupplier={(id) => deleteSupplier(id)}
						/>
					)))}
				</div>
			</div>
		)}
	</div>
  );
};

SupplierDirectorySection.propTypes = {
  proposal: PropTypes.object.isRequired,
  deleteSupplier: PropTypes.func.isRequired,
  addSupplier: PropTypes.func.isRequired,
  existingSuppliers: PropTypes.array,
};

SupplierDirectorySection.defaultProps = {
  existingSuppliers: null,
};

const mapStateToProps = (state) => ({
  existingSuppliers: state.tenant.suppliers,
});

export default connect(mapStateToProps, null)(SupplierDirectorySection);
