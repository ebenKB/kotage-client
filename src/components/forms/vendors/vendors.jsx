import React from 'react';
import './vendors.scss';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import Collapsible from '../../snippets/collapsible/collapsible';
import QuestionCreator from '../../snippets/question-creator/question-creator';
import { ValidatorForm } from 'react-form-validator-core';

const Vendors = () => {
  const handleSubmit =() => {
    console.log('We want to handle submit here...')
  }
  
  return (
	<MainContent
    classes='m-t-20'
  >
		<KtWrapper
      header="Invite Vendor"
    >
			<ValidatorForm
        onSubmit={handleSubmit}
      >
				<Divider type="thick" title="Vendor Details" classes="m-t-10" />
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
				<div className="m-t-30">
					<Collapsible
              title="Documents - Request documents from vendor"
            >
						<div className="kt-content__wrapper">
							<QuestionCreator
                  label="Your Question"
                />
						</div>
					</Collapsible>
				</div>
				<div className="m-t-30">
					<Collapsible
              title="Documents - Request custom information from vendor"
            >
						<div className="kt-content__wrapper">
							<QuestionCreator
                  label="Document name"
                />
						</div>
					</Collapsible>
				</div>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
  )
};

export default Vendors;
