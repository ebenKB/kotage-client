/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './floating-supplier-list.scss';
import { Checkbox, Button } from 'semantic-ui-react';
import SearchField from '../form-fields/search-field/search-field';
import Divider from '../kt-divider/divider';
// import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import { ReactComponent as Icon } from '../../svg/close.svg';
import { getAllSuppliers } from '../../redux/actions/tenantActions';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';

const FloatingSupplierList = ({
  isLoading, isVisible, closeForm, suppliers, getSuppliers, loading, handleAction,
}) => {
  useEffect(() => {
    if (!suppliers || suppliers.length === 0) {
      getSuppliers();
    }
  }, [isVisible]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [isSelectAll, setSelectAll] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  // select suppliers to be added to event
  const handleSelectionChange = (supplier) => {
    const existing = selectedSuppliers.find((s) => s.id === supplier.id);
    if (existing === null || existing === undefined) {
      // add the supplier to the selection
      setSelectedSuppliers([
        ...selectedSuppliers,
        supplier,
      ]);
    } else {
      // remove the supplier from the selection
      const newSuppliers = selectedSuppliers.filter((s) => s.id !== supplier.id);
      setSelectedSuppliers([
        ...newSuppliers,
      ]);
    }
  };

  const handleSearch = (value) => {
    setSearchKey(value);
    if (value !== '') {
      setIsSearching(true);
    } else { setIsSearching(false); }
    const newSuppliers = suppliers
      .filter((s) => (s.name.toLowerCase().match(value.trim()))
        || (s.email.toLowerCase().match(value.trim())));
    setFilteredSuppliers(newSuppliers);
  };

  // return selected suppliers  or all suppliers to the caller
  const addNewSuppliers = () => {
    if (isSelectAll) {
      handleAction(suppliers);
    } else {
      handleAction(selectedSuppliers);
    }
  };

  const handleSelectAllSuppliers = () => {
    setSelectAll(!isSelectAll);
  };

  const handleClose = () => {
    closeForm();
  };

  const getContent = () => {
    if (isSelectAll) {
      return (
        `Add ${suppliers.length} suppliers`
      );
    }

    if (selectedSuppliers.length === 0 && !isSelectAll) {
      return (
        'No supplier selected'
      );
    }

    if (selectedSuppliers.length === 1) {
      return `Add ${selectedSuppliers.length} supplier`;
    }

    return `Add ${selectedSuppliers.length} suppliers`;
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
				<SearchField
					onChange={(value) => handleSearch(value)}
					searchKey={searchKey}
				/>
				{loading && (
					<div>Loading</div>
				)}
				<div className="m-t-30">
					<Checkbox label="Select All" onChange={handleSelectAllSuppliers} />
					<Divider type="thick" />
					<div className="m-t-20">
						{/* use this when the suppliers are passes as props */}
						{!isSearching && suppliers && suppliers.map((supplier) => (
							<SupplierListItem
								key={supplier.id}
								supplier={supplier}
								handleChange={(s) => handleSelectionChange(s)}
								isSelectAll={isSelectAll}
							/>
						))}
						{/* Use this when we need to fetch the suppliers from the api */}
						{isSearching && filteredSuppliers && filteredSuppliers.map((supplier) => (
							<SupplierListItem
								key={supplier.id}
								handleChange={(s) => handleSelectionChange(s)}
								isSelectAll={isSelectAll}
								supplier={supplier}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
		<div className="kt-wrapper__header supplier-float__footer">
			<div className="supplier-float__footer-content">
				<Button
					type="submit"
					content={getContent()}
					className={`fluid green ${isLoading && 'loading'}`}
					onClick={addNewSuppliers}
				/>
			</div>
		</div>
	</div>
  );
};

FloatingSupplierList.propTypes = {
  isLoading: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getSuppliers: getAllSuppliers,
};

const mapStateToProps = (state) => ({
  // tempSuppliers: state.tenant.tempSuppliers,
  // suppliers: state.tenant.suppliers,
  loading: state.tenant.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatingSupplierList);
