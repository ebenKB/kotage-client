/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import MainContent from '../../../kt-main-content/mainContent';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import Divider from '../../../kt-divider/divider';
import FormGroup from '../../../form-fields/form-group/form-group';
import ItemDetailsWrapper from '../../../snippets/item-details-wrapper/item-details-wrapper';
import { createRequisition } from '../../../../redux/actions/requisitionActions';
import './requisition.scss';
import ApproverList from '../../../approver-list/approver-list';


import help from '../../../../utils/requisitions/new/help';

/**
 * Use this compomenent to create new sourcing requisitions
 * It calls several other components and passess the neccessary actions
 */
class Requisitions extends React.Component {
  constructor(props) {
    super(props);
    // check if there is a draft for a requisition and load the
    // draft otherwise create a new blank requisition and save as draft
    this.state = {
      title: '',
      delivery_date: '',
      amount: 0.00,
      warehouse: '',
      notes: '',
      item_details: [{
        product_code: 'SKU-WW-323',
        description: 'How would would describe the item?',
        quantity: 0,
      }],
      files: [],
      approvers: [1],
      status: 1,
    };
    this.myRef = React.createRef();
  }

  render() {
    const requisition = this.state;

    // create a new requisition
    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.createRequisition(requisition);
      this.myRef.current.isFormValid(false).then((value) => console.log(value));
    };

    /**
     * handle change when user types in a field
     * @param {*} e The default Javascript event
     */
    const handleInputChange = (e) => {
      const { value, name } = e.target;
      this.setState((r) => ({
        ...r,
        [name]: value,
      }));
    };

    /**
     * This method listens to any change that occurs in an item detail
     * @param {*} e the default Javascript event
     */
    const handleItemDetailsChange = (e) => {
      const { value, name, id } = e.target;
      const new_item_details = requisition.item_details;
      new_item_details[id][name] = value;
      this.setState((r) => ({
        ...r,
        item_details: new_item_details,
      }));
    };

    const setApprover = (approver) => {
      const { approvers } = requisition;
      // check if the selected approver is not already set to the requisition
      const exisitng_approver = approvers.find((x) => x == approver);
      if (exisitng_approver == null) {
        this.setState((oldState) => ({
          ...oldState,
          approvers: [...approvers, approver],
        }));
      }
    };

    /**
     * this method is used to add a new item detail to the requistion
     */
    const addNewItem = () => {
      const items = this.state.item_details;
      this.setState((req) => ({
        ...req,
        item_details: [...items, {
          product_code: '',
          description: '',
          quantity: 0,
        }],
      }));
    };

    /**
     *
     * @param {*} files the files to set to the requisition
     */
    const handleFiles = (files) => {
      this.setState((req) => ({
        ...req,
        files,
      }));
    };

    /**
     * Remove an item detail from a requisition
     * @param {*} item the item detail to be removed
     */
    const deleteItem = () => {
    };

    return (
	<MainContent
		help={help}
		classes="m-t-20"
	>
		<KtWrapper
			header="New Requisition"
			canFilter={false}
			canPerform
			handleAction={handleSubmit}
		>
			<ValidatorForm
				ref={this.myRef}
				onSubmit={createRequisition}
			>
				<Divider type="thick" title="Request Details" classes="m-t-10" />
				<div className="kt-content__wrapper">
					<div className="m-t-30">
						<FormGroup
							type="text"
							placeholder="Enter title"
							label="Title"
							labelName="title"
							value={requisition.title}
							onChange={handleInputChange}
							name="title"
							center
							validators={['required', 'isString', 'minStringLength:2']}
							errorMessages={['this field is required', 'email is not valid', 'Text too short']}
							instantValidate
						/>
					</div>
					<div className="m-t-20">
						<FormGroup
							type="date"
							placeholder="What is the Delivery date?"
							label="Delivery date"
							labelName="title"
							name="delivery_date"
							value={requisition.delivery_date}
							onChange={handleInputChange}
							center
						/>
					</div>
					<div className="m-t-20">
						<FormGroup
							type="text"
							placeholder="Where will it be delivered to?"
							label="Warehouse"
							labelName="warehouse"
							name="warehouse"
							value={requisition.warehouse}
							onChange={handleInputChange}
							center
						/>
					</div>
				</div>
				<div className="m-t-20">
					<Divider type="thick" title="Item Details" />
					<div className="m-t-30">
						<ItemDetailsWrapper
							item_details={requisition.item_details}
							handleAction={addNewItem}
							deleteItem={deleteItem}
							handleChange={handleItemDetailsChange}
						/>
					</div>
				</div>
				<Divider type="thick" title="Supplementary Details" />
				<div className="kt-content__wrapper">
					<div className="m-t-20">
						<FormGroup
							type="amount"
							placeholder="Enter the amount"
							label="Budget"
							labelName="amount"
							name="amount"
							value={requisition.amount}
							onChange={handleInputChange}
							center
						/>
					</div>
					<div className="m-t-20">
						<FormGroup
							type="kt-textarea"
							label="Notes"
							labelName="notes"
							name="notes"
							value={requisition.notes}
							onChange={handleInputChange}
						/>
					</div>
					<div className="m-t-20 dropzone">
						<FormGroup
							type="dropzone"
							placeholder="Do you have any comments?"
							label="Attachments"
							labelName="notes"
							onFilesChange={(files) => handleFiles(files)}
						/>
					</div>
				</div>
				<Divider type="thick" title="Approval Chain" />
				<ApproverList
					labelName="Approvers"
					label="Approvers"
					onChange={setApprover}
				/>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
    );
  }
}

export default connect(null, { createRequisition })(Requisitions);
