/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
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
import { createProposal } from '../../../redux/actions/rfpActions';
import { removeTimeFromDate } from '../../../utils/app/index';

class RFP extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.myRef = React.createRef();
    this.state = {
      canShowSuplliers: false,
      newProposal: {
        title: '',
        description: '',
        bid_deadline_date: '',
        rsvp_deadline_date: '',
        question_deadline_date: '',
        bid_deadline_time: '',
        rsvp_deadline_time: '',
        question_deadline_time: '',
        currency_id: null,
        tenant_id: currentUser.tenant_id,
        suppliers: null,
        questions: null,
        files: [{ file: 'example@fileLocation.com' }],
        stakeholders: [
          {
            id: currentUser.id,
            access_level: 2,
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
          },
        ],
        documents: [{
          id: shortid.generate(),
          name: '',
          description: '',
        }],
        proposal_attachments_attributes: null,
        proposal_response_sheet_attributes: {
          proposal_question_attributes: null,
          proposal_document_requests_attributes: null,
        },
      },
      currencyOptions: [
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
      ],
    };
  }

  render() {
    const { canShowSuplliers, newProposal, currencyOptions } = this.state;
    const { createNewProposal } = this.props;
    const handleSubmit = () => {

    };

    const handleInputChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      const proposal = newProposal;
      proposal[name] = value;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const setDate = (date, name) => {
      const proposal = newProposal;
      proposal[name] = removeTimeFromDate(date);
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
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
      const proposal = newProposal;
      proposal.description = e;
      this.setState((state) => (
        {
          ...state,
          newProposal: proposal,
        }));
    };
    const deleteDocument = (id) => {
      const newDocs = newProposal.documents.filter((doc) => doc.id !== id);
      const proposal = newProposal;
      proposal.documents = newDocs;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const addNewDocument = () => {
      // check if the previous document is not empty
      const docSize = newProposal.documents.length;
      const prevDoc = newProposal.documents[docSize - 1];
      if ((prevDoc && (prevDoc.name !== '' && prevDoc.description !== '')) || (!prevDoc)) {
        const document = {
          id: shortid.generate(),
          name: '',
          description: '',
        };
        const newDocs = [...newProposal.documents, document];
        const proposal = newProposal;
        proposal.documents = newDocs;
        this.setState((state) => ({
          ...state,
          newProposal: proposal,
        }));
      }
    };

    const addNewStakeholder = (stakeholder, access) => {
      console.log('we want to add a new stakeholder', stakeholder, access);
    };

    const updateDocument = (index, newDoc) => {
      const { documents } = newProposal;
      const proposal = newProposal;
      documents[index] = newDoc;
      proposal.documents = documents;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const handlePublish = () => {
      createNewProposal(newProposal);
      console.log('The is the proposl that we want to create', newProposal);
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
							name="title"
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
							options={currencyOptions}
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
					<KtDocsGroup
						documents={newProposal.documents}
						deleteDocument={(id) => deleteDocument(id)}
						addNewDocument={addNewDocument}
						updateDocument={(id, index, newDoc) => updateDocument(id, index, newDoc)}
					/>
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
							addStakeholder={(stakeholder, access) => addNewStakeholder(stakeholder, access)}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RFP);
