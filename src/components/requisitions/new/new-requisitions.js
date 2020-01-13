import React from 'react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import ItemDetailsWrapper from '../../snippets/item-details-wrapper/item-details-wrapper';

import './requisition.scss';
import ApproverList from '../../approver-list/approver-list';

const Requisitions = () => {

  const help = [
    {
      id: 1,
      title: 'New Requisition',
      content: 'Complete the form to create a new requisition'
    }
  ]

  return (
    <MainContent
      help={help}
      classes="m-t-20"
    >
      <KtWrapper
        header="New Requisition"
        canFilter={false}
        canPerform={true}
      >
        <Divider type="thick" title="Request Details" classes="m-t-10"/>
          <div className="kt-content__wrapper">
            <div className="m-t-30">
              <FormGroup 
                type="text" 
                placeholder="Enter title"
                label="Title"
                labelName="title"
              />
            </div>
            <div className="m-t-20">
              <FormGroup 
                type="text" 
                placeholder="What is the Delivery date?"
                label="Delivery date"
                labelName="title"
              />
            </div>
            <div className="m-t-20">
              <FormGroup 
                type="text" 
                placeholder="Where will it be delivered to?"
                label="Warehouse"
                labelName="warehouse"
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
              />
            </div>
            <div className="m-t-20">
              <FormGroup 
                type="textarea"
                placeholder="Requisition notes"
                label="Notes"
                labelName="notes"
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
      </KtWrapper>
    </MainContent>
  )
}

export default Requisitions;
