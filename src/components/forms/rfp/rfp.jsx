import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import DateTimeGroup from '../../form-fields/date-time-form-group/date-time-group';
import KtDocs from '../../form-fields/kt-docs-group/kt-docs';
import Stakeholders from '../../snippets/stakeholders-group/stakeholders';
import FloatingSupplierList from '../../floating-supplier-list/floating-supplier-list';

class Rfp extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const handleSubmit = () => {
      console.log('we want to submit');
    };
    return (
	<ValidatorForm
		ref={this.myRef}
		onSubmit={handleSubmit}
	>
		<MainContent
			classes="m-t-20"
		>
			<KtWrapper
				header="New Quote"
				canFilter={false}
				canPerform
			>
				<Divider type="thick" title="Setup Your Event" classes="m-t-10" isNumbered number="1" />
				<div className="kt-content__wrapper">
					<div className="form-item m-t-30">
						<FormGroup
							type="text"
							placeholder="Enter title"
							label="Title"
							labelName="title"
							value="Request for NOC"
							center
						/>
					</div>
					<div className="form-item m-t-30">
						<FormGroup
							type="kt-textarea"
							placeholder="How would you describe the quote?"
							label="Description"
							labelName="decription"
						/>
					</div>
					<div className="form-item m-t-30">
						<FormGroup
							type="dropzone"
							placeholder="Enter title"
							label="Attach Files"
							labelName="attachment"
						/>
					</div>
					<div className="form-item m-t-30">
						<FormGroup
							type="dropdown"
							placeholder="Enter title"
							label="Event Type*"
							labelName="event_type"
							classes="small"
							center
						/>
					</div>
					<div className="form-item m-t-30">
						<FormGroup
							type="amount"
							placeholder="What is the budget?"
							label="Budget"
							labelName="budget"
							classes="small"
							center
						/>
					</div>
					<Divider type="thick" title="Timeline" classes="m-t-40" isNumbered number="2" />
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="Bid Deadline *"
							center
						/>
					</div>
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="RSVP Deadline"
							center
						/>
					</div>
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="Question Deadline"
							center
						/>
					</div>
					<Divider type="thick" title="Response Sheet" classes="m-t-40" isNumbered number="3" />
					<KtDocs className="form-item" />
					<Divider type="thick" title="Invite Vendors" classes="m-t-40" isNumbered number="4" />
					<div className="form-item">
            Show the names of all vendors you want to invite
						<span>Vendors are here</span>
						<FloatingSupplierList />
					</div>
					<Divider type="thick" title="Invite Stakeholders" classes="m-t-40" isNumbered number="5" />
					<div>
						<Stakeholders
							className="form-item"
						/>
					</div>
				</div>
			</KtWrapper>
		</MainContent>
	</ValidatorForm>
    );
  }
}

export default Rfp;
