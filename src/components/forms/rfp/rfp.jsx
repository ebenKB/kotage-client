/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ValidatorForm } from 'react-form-validator-core';
import { Button } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import FormGroup from '../../form-fields/form-group/form-group';
import DateTimeGroup from '../../form-fields/date-time-form-group/date-time-group';
import KtDocsGroup from '../../form-fields/kt-docs-group/kt-docs-group';
import FloatingSupplierList from '../../floating-supplier-list/floating-supplier-list';
import Help from '../../../utils/requisitions/new/help';
import SupplierListItem from '../../snippets/supplier-list-item/supplier-list-item';
import './rfp.scss';
import StakeholderGroup from '../../stakeholder-group/stakeholder-group';
import { createProposal, setRFPOwner } from '../../../redux/actions/rfpActions';

class RFP extends React.Component {
  constructor(props) {
    super(props);
    // set a default owner for the proposal
    this.props.addOwnerToRFP();
    // const { currentUser } = this.props;
    this.myRef = React.createRef();
    this.state = {
      canShowSuplliers: false,
    };
  }

  render() {
    const { canShowSuplliers } = this.state;
    const { createNewProposal, newProposal } = this.props;
    const handleSubmit = () => {

    };

    const handleInputChange = (e) => {
      e.preventDefault();
      console.log('The input has change and this is the value', e);
    };

    const setDate = (data, name) => {
      if (name === 'bid_deadline_date') {
        newProposal.bid_deadline_date = data;
      } else if (name === 'rsvp_deadline_date') {
        newProposal.rsvp_deadline_date = data;
      } else if (name === 'question_deadline_date') {
        newProposal.question_deadline_date = data;
      }
    };

    const setTime = (time, name) => {
      if (name === 'bid_deadline_time') {
        newProposal.bid_deadline_time = time;
      } else if (name === 'rsvp_deadline_time') {
        newProposal.rsvp_deadline_time = time;
      } else if (name === 'question_deadline_time') {
        newProposal.question_deadline_time = time;
      }
    };
    const setDescription = (e) => {
      newProposal.description = e;
    };

    const handlePublish = () => {
      createNewProposal(newProposal);
    };

    // use this function to open the floating supplier directory to select suppliers
    const openSupplierDirectory = () => {
      this.setState((state) => ({
        ...state,
        canShowSuplliers: true,
      }));
    };

    // use this function to hide the floating suppplier list items
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
				isDisabled={false}
				isLoading={false}
				cancelUrl="/rfx"
				handleAction={handleSubmit}
				handlePublishAction={handlePublish}
				saveBtnClasses="default"
			>
				<Divider type="thick" title="Setup Your Event" classes="m-t-10" isNumbered number="1" />
				<div className="kt-content__wrapper">
					<div className="form-item m-t-30">
						<FormGroup
							type="text"
							placeholder="Enter title"
							label="Title *"
							labelName="title"
							value={newProposal.title}
							onChange={handleInputChange}
							center
						/>
					</div>
					<div className="form-item m-t-30">
						<FormGroup
							type="rte"
							placeholder="How would you describe the quote?"
							label="Description"
							labelName="decription"
							onChange={setDescription}
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
							placeholder="Select currency"
							label="Currency Type *"
							labelName="event_type"
							classes="small"
							center
							options={
                [
                  {
                    key: '1',
                    text: 'GHC',
                    value: 'GHC',
                  },
                  {
                    key: '2',
                    text: 'USD',
                    value: 'USD',
                  },
                ]
              }
						/>
					</div>
					<Divider type="thick" title="Timeline" classes="m-t-40" isNumbered number="2" />
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="Bid Deadline *"
							center
							onDateChange={(date) => setDate(date, 'bid_deadline_date')}
							onTimeChange={(time) => setTime(time, 'bid_deadline_time')}
						/>
					</div>
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="RSVP Deadline"
							center
							onDateChange={(date) => setDate(date, 'rsvp_deadline_date')}
							onTimeChange={(time) => setTime(time, 'rsvp_deadline_time')}
						/>
					</div>
					<div className="form-item m-t-30">
						<DateTimeGroup
							placeholder="Date"
							label="Question Deadline"
							center
							onDateChange={(date) => setDate(date, 'question_deadline_date')}
							onTimeChange={(time) => setTime(time, 'question_deadline_time')}
						/>
					</div>
					<Divider type="thick" title="Response Sheet" classes="m-t-40" isNumbered number="3" />
					{/* {newProposal.documents && newProposal.documents.map((doc) => (
						<KtDocs className="form-item" key={doc.id} doc={doc} />
					))} */}
					<KtDocsGroup documents={newProposal.documents} />
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
						{newProposal.suppliers && newProposal.suppliers.length > 0 && (
							<Fragment>
								<Divider type="faint" title="" classes="m-t-20" isNumbered={false} />
								<div>
									<div className="bold faint-caption m-t-8 m-b-8">3 ADDED SUPPLIERS</div>
									<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
									<div className="xsm-caption supplier-content__heading faint-caption m-t-8 m-b-8">
										<div>
											<div>SUPPLIER NAME</div>
										</div>
										<div>CONTACT</div>
									</div>
									<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
									<div className="items-group underline bottom">
										<SupplierListItem isInline />
										<SupplierListItem isInline />
										<SupplierListItem isInline />
									</div>
								</div>
							</Fragment>
						)}
					</div>
					<Divider type="thick" title="Invite Stakeholders" classes="m-t-40" isNumbered number="5" />
					{newProposal.stakeholders && (
						<StakeholderGroup
							stakeholders={newProposal.stakeholders}
						/>
					)}
				</div>
			</KtWrapper>
		</MainContent>
	</ValidatorForm>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  newProposal: state.rfp.newProposal,
});

const mapDispatchToProps = {
  createNewProposal: createProposal,
  addOwnerToRFP: setRFPOwner,
};

export default connect(mapStateToProps, mapDispatchToProps)(RFP);
