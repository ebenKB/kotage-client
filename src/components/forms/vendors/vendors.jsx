import React from 'react';
import { Form } from 'semantic-ui-react';
import './vendors.scss';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import Collapsible from '../../snippets/collapsible/collapsible';
import QuestionCreator from '../../snippets/question-creator/question-creator';

const Vendors = () => (
	<MainContent
		classes="m-t-20"
	>
		<KtWrapper
			header="Invite Vendor"
		>
			<Divider type="thick" title="Vendor Details" classes="m-t-10" />
			<Form>
				<div className="kt-content__wrapper">
					<div className="m-t-30">
						<FormGroup
							type="text"
							placeholder="Enter title"
							label="Vendor Name"
							labelName="name"
							center
						/>
					</div>
					<div className="m-t-30">
						<FormGroup
							type="email"
							placeholder="example@email.com"
							label="Contact Email"
							labelName="email"
							center
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
			</Form>
		</KtWrapper>
	</MainContent>
);

export default Vendors;
