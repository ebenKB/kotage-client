import React, {useState} from 'react';
import { connect } from 'react-redux';
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


const Requisitions = ({createRequisition}) => {

  // prepare a requisition to be saved
  const [requisition, updateRequisition] = useState({
    title: '',
    name:'',
    delivery_date: '',
    amount: 0.00,
    warehouse : '',
    notes: '',
    item_details: [{}]
  });
  const help = [
    {
      id: 1,
      title: 'New Requisition',
      content: 'Complete the form to create a new requisition'
    }
  ]

  // create a new requisition
  const newRequisition = (e) => {
    e.preventDefault();
    // console.log('we want to create a requisition...', requisition)
    createRequisition(requisition);
  }

  // handle change when user types in a field
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    updateRequisition((r) => ({
      ...r,
      [name]: value
    }));
  }

  const addNewItem  =() => {
    console.log('we want to add a new item...');
    alert('hey')
  }

  const deleteItem  = (item) => {
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
        handleAction={newRequisition}
      >
      <ValidatorForm
          
          onSubmit={createRequisition}
        >
          <Divider type="thick" title="Request Details" classes="m-t-10"/>
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
                  validators={['required', 'isString']}
                  errorMessages={['this field is required', 'email is not valid']}
                  instantValidate={true}
                />
              </div>
              <div className="m-t-20">
                <FormGroup 
                  type="text" 
                  placeholder="What is the Delivery date?"
                  label="Delivery date"
                  labelName="title"
                  name="delivery_date"
                  value={requisition.delivery_date}
                  onChange={handleInputChange}
                  center={true}
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
                />
              </div>
            </div>
            <div className="m-t-20">
              <Divider type="thick" title="Item Details"/>
              <div className="m-t-30">
                <ItemDetailsWrapper
                  item_details={requisition.item_details}
                  handleAction={addNewItem}
                  deleteItem={deleteItem}
                />
              </div>
            </div>
            <Divider type="thick" title="Supplementary Details"/>
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
                  placeholder="Do you have any comments?"
                  label="Attachments"
                  labelName="notes"
                />
              </div>
            </div>
            <Divider type="thick" title="Approval Chain"/>
            <ApproverList
              labelName="Approvers"
              label="Approvers"
            />
          </ValidatorForm>
      </KtWrapper>
    </MainContent>
  )
}

export default connect(null, { createRequisition })(Requisitions);
