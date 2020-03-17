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
import SupplierListItemFetch from '../snippets/supplier-list-item-fetch/supplier-list-item-fetch';
import { ReactComponent as Icon } from '../../svg/close.svg';
import { getAllSuppliers } from '../../redux/actions/tenantActions';

const FloatingSupplierList = ({
  isLoading, isVisible, closeForm, suppliers, tempSuppliers, getSuppliers, loading, handleAction,
}) => {
  useEffect(() => {
    if (!tempSuppliers || tempSuppliers.length === 0) {
      getSuppliers();
    }
  }, [isVisible]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [isSelectAll, setSelectAll] = useState(false);

  const handleSelectionChange = (supplier) => {
    if (selectedSuppliers.includes(supplier)) {
      // remove the supplier from the selection
      const newSuppliers = selectedSuppliers.filter((s) => s.id !== supplier.id);
      setSelectedSuppliers(() => newSuppliers);
    } else {
      // add the supplier to the selection
      setSelectedSuppliers((state) => ([
        ...state,
        supplier,
      ]));
    }
  };

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
				<SearchField />
				{loading && (
					<div>Loading</div>
				)}
				<div className="m-t-30">
					<Checkbox label="Select All" onChange={handleSelectAllSuppliers} />
					<Divider type="thick" />
					<div className="m-t-20">
						{tempSuppliers && tempSuppliers.map((supplier) => (
							<SupplierListItemFetch
								uid={supplier.uid}
								handleChange={(s) => handleSelectionChange(s)}
								isSelectAll={isSelectAll}
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
  tempSuppliers: state.tenant.tempSuppliers,
  suppliers: state.tenant.suppliers,
  loading: state.tenant.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatingSupplierList);
