import React from 'react';
import MainContent from '../../../kt-main-content/mainContent';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import Divider from '../../../kt-divider/divider';
import FormGroup from '../../../form-fields/form-group/form-group';
import ItemDetailsWrapper from '../../../snippets/item-details-wrapper/item-details-wrapper';
import { createRequisition } from '../../../../redux/actions/requisitionActions';
import './requisition.scss';
import ApproverList from '../../../approver-list/approver-list';
import './requisition.scss';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import help from '../../../../utils/requisitions/new/help';

/**
 * Use this compomenent to create new sourcing requisitions
 * It calls several other components and passess the neccessary actions
 */
class Requisitions extends React.Component {
  constructor(props) {
    super(props);
    // check if there is a draft for a requisition and load the draft otherwise create a new blank requisition and save as draft
    this.state = {
      title: '',
      deliver_by: '',
      budget: 0.00,
      warehouse: '',
      notes: '',
      sourcing_requisition_items: [{
        product_code: 'SKU-WW-323',
        description: 'How would would describe the item?',
        quantity: 0
      }],

      sourcing_attachments: [],
      approvers: [1],
      status_id: 1,
    }
    this.myRef = React.createRef();
  }
  render() {
    const requisition = this.state;

    // create a new requisition
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log('we want to create a requisition...', requisition)
      this.props.createRequisition(requisition);
      this.myRef.current.isFormValid(false).then(value => console.log(value))
      .catch((err) => console.log());
    }

    /**
     * handle change when user types in a field 
     * @param {*} e The default Javascript event
     */
    const handleInputChange = (e) => {
      const { value, name } = e.target;
      this.setState((r) => ({
        ...r,
        [name]: value
      }));
    }

    /**
     * This method listens to any change that occurs in an item detail
     * @param {*} e the default Javascript event
     */
    const handleItemDetailsChange = (e) => {
      console.log('This is the target', e)
      const { value, name, id } = e.target;
      const new_item_details = requisition.sourcing_requisition_items;
      new_item_details[id][name] = value;
      this.setState((r) => ({
        ...r,
        sourcing_requisition_items: new_item_details,
      }));
    }

    const setApprover = (approver) => {
      const approvers = requisition.approvers;
      // check if the selected approver is not already set to the requisition
      const exisitng_approver = approvers.find(x => x == approver);
      if (exisitng_approver == null) {
        this.setState((oldState) => ({
          ...oldState,
          approvers: [...approvers, approver]
        }));
      }
    }

    /**
     * this method is used to add a new item detail to the requistion
     */
    const addNewItem = () => {
      const items = this.state.sourcing_requisition_items;
      this.setState( ({
        sourcing_requisition_items: [...items, {
          product_code: '',
          description: '',
          quantity: 0
        }]
      }));
    }

    /**
     *
     * @param {*} sourcing_attachments the sourcing_attachments to set to the requisition
     */
    const handlesourcing_attachments = (sourcing_attachments) => {
      console.log('We recienved some files', sourcing_attachments)
      this.setState((req) => ({
        ...req,
        sourcing_attachments: sourcing_attachments
      }));
    }

    /**
     * Remove an item detail from a requisition
     * @param {*} item the item detail to be removed
     */
    const deleteItem = (item) => {
      console.log('deleting the item', item);
    }

  return (
	<MainContent
      help={help}
      classes="m-t-20"
    >
		<KtWrapper
      header="New Requisition"
      canFilter={false}
      canPerform={true}
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
              center={true}
              validators={['required', 'isString', 'minStringLength:2']}
              errorMessages={['this field is required', 'email is not valid', 'Text too short']}
              instantValidate={true}
            />
					</div>
					<div className="m-t-20">
						<FormGroup
              type="date"
              placeholder="What is the Delivery date?"
              label="Delivery date"
              labelName="title"
              name="deliver_by"
              value={requisition.deliver_by}
              onChange={handleInputChange}
              center={true}
              validators={['required', 'isString']}
              errorMessages={'Please provide a date for delivery'}
              instantValidate={true}
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
              center={true}
              validators={['required', 'isString', 'minStringLength:2']}
              errorMessages={'this fields is required','jjj', 'Please enter string characters','Text too short'}
              instantValidate={true}
            />
					</div>
				</div>
				<div className="m-t-20">
					<Divider type="thick" title="Item Details" />
					<div className="m-t-30">
						<ItemDetailsWrapper
              item_details={requisition.sourcing_requisition_items}
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
              labelName="budget"
              name="budget"
              value={requisition.budget}
              onChange={handleInputChange}
              center={true}
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
              label="Attachments"
              labelName="notes"
              onFilesChange={(sourcing_attachments) => handlesourcing_attachments(sourcing_attachments)}
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
    )
  }
}

export default connect(null, { createRequisition })(Requisitions);
