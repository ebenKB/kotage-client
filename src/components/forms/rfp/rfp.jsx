import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { Button } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import DateTimeGroup from '../../form-fields/date-time-form-group/date-time-group';
import KtDocs from '../../form-fields/kt-docs-group/kt-docs';
import Stakeholders from '../../snippets/stakeholders-group/stakeholders';
import FloatingSupplierList from '../../floating-supplier-list/floating-supplier-list';
import Help from '../../../utils/requisitions/new/help';
import './rfp.scss';
// import SupplierListItem from '../../snippets/supplier-list-item/supplier-list-item';

class Rfp extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      canShowSuplliers: false,
    };
  }


  render() {
    const { canShowSuplliers } = this.state;
    const handleSubmit = () => {
      console.log('we want to submit');
    };

    const openSupplierDirectory = () => {
      this.setState((state) => ({
        ...state,
        canShowSuplliers: true,
      }));
    };

    const hideSuppliers = () => {
      this.setState((state) => ({
        ...state,
        canShowSuplliers: false,
      }));
    };

    return (
	<ValidatorForm
		ref={this.myRef}
		onSubmit={handleSubmit}
	>
		<MainContent
			classes="m-t-20"
			help={Help}
		>
			<KtWrapper
				header="New Proposal"
				canFilter={false}
				canPerform
				canPublish
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
							type="rte"
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
							label="Currency Type*"
							labelName="event_type"
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
					<Divider type="thick" title="Invite Suppliers" classes="m-t-40" isNumbered number="4" />
					<div className="form-item">
						<div className="flex-inline m-t-20">
							<div>Open your supplier directory to add suppliers</div>
							<div className="">
								<Button
									onClick={openSupplierDirectory}
									className="flex-center kt-transparent kt-primary clickable m-t-20 kt-primary bold sm-caption flex-center"
								>
									<span className="kt-primary">Open Supplier Directory</span>
								</Button>
								<FloatingSupplierList
									isVisible={canShowSuplliers}
									closeForm={hideSuppliers}
								/>
							</div>
						</div>
						{/* <Divider type="faint" title="" classes="m-t-20" isNumbered={false} />
						<div>
							<div className="bold faint-caption m-t-8 m-b-8">3 ADDED SUPPLIERS</div>
							<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
							<div className="xsm-caption supplier-content__heading faint-caption m-t-8 m-b-8">
								<div>
									<di>SUPPLIER NAME</di>
								</div>
								<div>CONTACT</div>
							</div>
							<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
							<div className="items-group underline bottom">
								<SupplierListItem isInline />
								<SupplierListItem isInline />
								<SupplierListItem isInline />
							</div>
						</div> */}
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
