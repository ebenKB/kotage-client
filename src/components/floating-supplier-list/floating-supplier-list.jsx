/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import './floating-supplier-list.scss';
import { Checkbox, Button } from 'semantic-ui-react';
import SearchField from '../form-fields/search-field/search-field';
import Divider from '../kt-divider/divider';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import { ReactComponent as Icon } from '../../svg/close.svg';
import { getAllSuppliers } from '../../redux/actions/tenantActions';

const FloatingSupplierList = ({
  isLoading, isVisible, closeForm, suppliers, getSuppliers, loading, handleAction,
}) => {
  useEffect(() => {
    if (!suppliers) {
      getSuppliers();
    }
  }, [isVisible]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([{ id: 999, name: 'Nuhu' }]);

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
    handleAction(selectedSuppliers);
  };

  const handleClose = () => {
    closeForm();
  };

  const getContent = () => {
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
					<Checkbox label="Select All" />
					<Divider type="thick" />
					<div className="m-t-20">
						<SupplierListItem
							supplier={{}}
							handleChange={(s) => handleSelectionChange(s)}
						/>
						<SupplierListItem
							supplier={{}}
							handleChange={(s) => handleSelectionChange(s)}
						/>
						<SupplierListItem
							supplier={{}}
							handleChange={(s) => handleSelectionChange(s)}
						/>
					</div>
				</div>
			</div>
		</div>
		<div className="kt-wrapper__header supplier-float__footer">
			<div className="supplier-float__footer-content">
				<Button
					type="submit"
					content={`${selectedSuppliers.length > 0 ? getContent() : 'No Supplier selected'}`}
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
  suppliers: state.tenant.suppliers,
  loading: state.tenant.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatingSupplierList);
