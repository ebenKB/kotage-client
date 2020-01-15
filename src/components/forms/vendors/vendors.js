import React from 'react';
import { Form } from 'semantic-ui-react';
import './vendors.scss';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import Collapsible from '../../snippets/collapsible/collapsible';
import QuestionCreator from '../../snippets/question-creator/question-creator';

const Vendors = () => {
  return (
    <MainContent
      classes='m-t-20'
    >
      <KtWrapper
        header="Invite Vendor"
      >
        <Divider type="thick" title="Vendor Details" classes="m-t-10"/>
        <Form>
          <div className="kt-content__wrapper">
            <div className="m-t-30">
              <FormGroup 
                type="text" 
                placeholder="Enter title"
                label="Vendor Name"
                labelName="name"
                center={true}
              />
            </div>
            <div className="m-t-30">
              <FormGroup 
                type="email" 
                placeholder="example@email.com"
                label="Contact Email"
                labelName="email"
                center={true}
              />
            </div>
          </div>
          <Divider type="thick" title={ <span> <span className="bold">Documents</span> <span> - Request documents from vendor </span>  </span> } classes="m-t-30"/>
          <div className="m-t-30">
            <Collapsible>
              <div className="kt-content__wrapper">
                <QuestionCreator/>
              </div>
            </Collapsible>
          </div>
        </Form>
      </KtWrapper>
    </MainContent>
  )
}

export default Vendors
