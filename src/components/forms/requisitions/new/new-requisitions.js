import React, {useState} from 'react';
import MainContent from '../../../kt-main-content/mainContent';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import Divider from '../../../kt-divider/divider';
import FormGroup from '../../../form-fields/form-group/form-group';
import {Form} from 'semantic-ui-react';
import ItemDetailsWrapper from '../../../snippets/item-details-wrapper/item-details-wrapper';

import './requisition.scss';
import ApproverList from '../../../approver-list/approver-list';
import Collapsible from '../../../snippets/collapsible/collapsible';

const Requisitions = () => {

  // prepare a requisition to be saved
  const [requisition, updateRequisition] = useState({
    title: '',
    name:'',
    delivery_date: '',
    amount: 0.00,
    warehouse : '',
    notes: '',
  });
  const help = [
    {
      id: 1,
      title: 'New Requisition',
      content: 'Complete the form to create a new requisition'
    }
  ]

  // create a new requisition
  const createRequisition = (e) => {
    e.preventDefault();
    console.log('we want to create a requisition...', requisition)
  }

  // handle change when user types in a field
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    updateRequisition((r) => ({
      ...r,
      [name]: value
    }))
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
        handleAction={createRequisition}
      >
        <Form>
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
                <ItemDetailsWrapper />
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
              <div className="m-t-20">
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
        </Form>
      </KtWrapper>
    </MainContent>
  )
}

export default Requisitions;
