/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { shortid } from 'shortid';
import { ValidatorForm } from 'react-form-validator-core';
import { Button } from 'semantic-ui-react';
import MainContent from '../kt-main-content/mainContent';
import KtWrapper from '../kt-wrapper/kt-wrapper';
import Divider from '../kt-divider/divider';
import FormGroup from '../form-fields/form-group/form-group';
import DateTimeGroup from '../form-fields/date-time-form-group/date-time-group';
import KtDocsGroup from '../form-fields/kt-docs-group/kt-docs-group';
import FloatingSupplierList from '../floating-supplier-list/floating-supplier-list';
import Help from '../../utils/requisitions/new/help';
import SupplierListItem from '../snippets/supplier-list-item/supplier-list-item';
import StakeholderGroup from '../stakeholder-group/stakeholder-group';
import { createProposal } from '../../redux/actions/rfpActions';
import QuestionCreator from '../snippets/question-creator/question-creator';
import { uploadFile } from '../../utils/app/index';
import './rfp-editor.scss';

class RfpEditor extends React.Component {
  constructor(props) {
    super(props);
    const { proposal, options } = this.props;
    this.state = {
      newProposal: proposal,
      type: options.type,
      heading: options.heading,
      shouldFetchData: false,
      currencyOptions: [
        {
          key: '1',
          text: 'GHC',
          value: '1',
        },
        {
          key: '2',
          text: 'USD',
          value: '2',
        },
      ],
    };
  }

  render() {
    const {
      canShowSuplliers, newProposal, currencyOptions, shouldFetchData, type, heading,
    } = this.state;
    const {
      createNewProposal, tenantUid, loading, history,
    } = this.props;

    const handleSubmit = () => {

    };

    const handleInputChange = (e) => {
      e.preventDefault();
      // check if we need to fetch any data for the form
      if (!shouldFetchData) {
        this.setState((state) => ({
          ...state,
          shouldFetchData: true,
        }));
      }
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
      proposal[name] = date;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const setTime = (time, name) => {
      newProposal[name] = time;
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

    const addSuppliers = (suppliers) => {
      if (suppliers && suppliers.length > 0) {
        let filteredSuppliers = [];
        for (const supplier of suppliers) {
          const found = newProposal.suppliers.find((x) => x.supplier_id === supplier.supplier_id);
          if (found === null || found === undefined) {
            filteredSuppliers = [...filteredSuppliers, supplier];
          }
        }
        const newSuppliers = [...newProposal.suppliers, ...filteredSuppliers];
        const proposal = newProposal;
        proposal.suppliers = newSuppliers;
        this.setState((state) => ({
          ...state,
          newProposal: proposal,
          canShowSuplliers: false,
        }));
      }
    };

    const deleteSupplier = (id) => {
      if (id) {
        const newSuppliers = newProposal.suppliers.filter((s) => s.supplier_id !== id);
        const proposal = newProposal;
        proposal.suppliers = newSuppliers;
        this.setState((state) => ({
          ...state,
          newProposal: proposal,
        }));
      }
    };
    const addNewStakeholder = (stakeholder, access) => {
      if (stakeholder && access) {
        const proposal = newProposal;
        const newStakeholders = [...newProposal.stakeholders, {
          id: stakeholder.id,
          access_level: access,
          firstname: stakeholder.firstname,
          lastname: stakeholder.lastname,
          email: stakeholder.email,
        }];
        proposal.stakeholders = newStakeholders;
        this.setState((state) => ({
          ...state,
          newProposal: proposal,
        }));
      }
    };

    const removeStakeholder = (id) => {
      const proposal = newProposal;
      proposal.stakeholders = newProposal.stakeholders.filter((s) => (s.id !== id));
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
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

    const setCurrency = (id) => {
      const proposal = newProposal;
      proposal.currency_id = id;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const setQuestions = (questions) => {
      const proposal = newProposal;
      proposal.questions = questions;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }));
    };

    const setFiles = (files) => {
      if (files) {
        const proposal = newProposal;
        proposal.files = files;
      }
    };

    const handlePublish = async () => {
      const files = await uploadFile(newProposal.files, tenantUid);
      const proposal = newProposal;
      proposal.files = files;
      this.setState((state) => ({
        ...state,
        newProposal: proposal,
      }), () => {
        createNewProposal(newProposal)
          .then(() => history.push('/rfx'))
          .catch(() => {
            console.log('an error occured');
          // remove files from s3
          });
      });
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
				header={heading}
				canFilter={false}
				canPerform
				canPublish={type === 'create'}
				isDisabled={loading}
				isLoading={loading}
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
							onFilesChange={(files) => setFiles(files)}
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
							onChange={(id) => setCurrency(id)}
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
							disablePast
							placeholder="Date"
							label="Question Deadline"
							center
							onDateChange={(date) => setDate(date, 'question_deadline_date')}
							onTimeChange={(time) => setTime(time, 'question_deadline_time')}
						/>
					</div>
					<Divider type="thick" title="Response Sheet" classes="m-t-40" isNumbered number="3" />
					<div className="m-b-20 m-t-20">
						<QuestionCreator
							setQuestions={(questions) => setQuestions(questions)}
						/>
					</div>
					<KtDocsGroup
						documents={newProposal.documents}
						deleteDocument={(id) => deleteDocument(id)}
						addNewDocument={addNewDocument}
						updateDocument={(id, index, newDoc) => updateDocument(id, index, newDoc)}
					/>
					<Divider type="thick" title="Invite Suppliers" classes="m-t-40" isNumbered number="4" />
					<div className="form-item">
						<div className="flex-inline m-t-30 m-b-30">
							<div>Open your supplier directory to add suppliers</div>
							<div className="">
								<Button
									onClick={openSupplierDirectory}
									className="flex-center kt-transparent kt-primary clickable m-t-20 kt-primary bold sm-caption flex-center"
								>
									<span className="kt-primary">Open Supplier Directory</span>
								</Button>
								{canShowSuplliers && (
									<FloatingSupplierList
										isVisible={canShowSuplliers}
										closeForm={hideSuppliers}
										handleAction={(suppliers) => addSuppliers(suppliers)}
									/>
								)}
							</div>
						</div>
						{newProposal.suppliers && newProposal.suppliers.length > 0 && (
							<Fragment>
								{/* <Divider type="faint" title="" classes="m-t-20" isNumbered={false} /> */}
								<div>
									<div className="bold faint-caption m-t-8 m-b-8">
										{ newProposal.suppliers.length }
										{' '}
                    ADDED SUPPLIER(S)
									</div>
									<Divider type="thick" title="" classes="m-t-8" isNumbered={false} />
									<div className="xsm-caption supplier-content__heading faint-caption m-t-8 m-b-8">
										<div>
											<div>SUPPLIER NAME</div>
										</div>
										<div>CONTACT</div>
									</div>
									<Divider type="thick" title="" classes="m-t-8" isNumbered={false} />
									<div className="items-group underline bottom">
										{newProposal.suppliers && (newProposal.suppliers.map((supplier) => (
											<SupplierListItem
												isInline
												supplier={supplier}
												key={supplier.supplier_id}
												deleteSupplier={(id) => deleteSupplier(id)}
											/>
										)))}
									</div>
								</div>
							</Fragment>
						)}
					</div>
					<Divider type="thick" title="Invite Stakeholders" classes="m-t-40" isNumbered number="5" />
					{newProposal.stakeholders && (
						<StakeholderGroup
							shouldFetchData={shouldFetchData}
							stakeholders={newProposal.stakeholders}
							addStakeholder={(stakeholder, access) => addNewStakeholder(stakeholder, access)}
							removeStakeholder={(id) => removeStakeholder(id)}
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
  tenantUid: state.tenant.currentTenant.account_id,
  loading: state.rfp.loading,
});

const mapDispatchToProps = {
  createNewProposal: createProposal,
};

export default connect(mapStateToProps, mapDispatchToProps)(RfpEditor);
