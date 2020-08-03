/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { createBid } from '../../../redux/actions/supplierBidActions';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';
import Dropzone from '../../dropzone/dropzone';
import { uploadFiles } from '../../../utils/app/index';
import { RFP_FOLDER_NAME } from '../../../utils/app/definitions';
import EmptyContentWrapper from '../../empty-content-wrapper/empty-content-wrapper';
import RfpTitle from '../supplier-rfp-title/rfp-title';

class EventResponse extends Component {
  constructor(props) {
    super(props);
    const { currentProposal: { questions } } = this.props;

    this.state = {
      event_owner_id: null,
      totalBidValue: '',
      bidValidity: null,
      rfpID: null,
      currency: null,
      rfpQuestionResponses: [],
      technicalRequirements: [],
      commercialRequirements: [],
      questions,
    };
  }

setBidCurrency = (selectedOption) => {
  this.setState((state) => ({
    ...state,
    currency: `${selectedOption.text}_${selectedOption.key}`,
  }));
};

addTechnicalProposal = (files) => {
  this.setState((state) => ({
    ...state,
    technicalRequirements: [...state.technicalRequirements, ...files],
  }));
}

addCommercialProposal = (files) => {
  this.setState((state) => ({
    ...state,
    commercialRequirements: [...state.commercialRequirements, ...files],
  }));
}

handleSubmit = async () => {
  const {
    respondToRfp, tenantUID, currentProposal, currentProposal: { id },
  } = this.props;
  const { commercialRequirements, technicalRequirements } = this.state;

  // set the owner
  this.setState((state) => ({
    ...state,
    rfpID: id,
    event_owner_id: currentProposal.tenant.id,
  }));

  // upload commercial requirements to remote server
  const commercialReqFiles = await uploadFiles(commercialRequirements, tenantUID, RFP_FOLDER_NAME);
  this.setState((state) => ({
    ...state,
    commercialRequirements: commercialReqFiles,
  }));

  // upload technical requirements to remote serve
  const technicalReqFiles = await uploadFiles(technicalRequirements, tenantUID, RFP_FOLDER_NAME);
  this.setState((state) => ({
    ...state,
    technicalRequirements: technicalReqFiles,
  }));

  respondToRfp(this.state, currentProposal.tenant.id);
};

handleAmountInputChange = ({ inputValue, selectedOption }) => {
  this.setState((state) => ({
    ...state,
    totalBidValue: inputValue,
  }));
  this.setBidCurrency(selectedOption);
}

handleDateInputChange = (date) => {
  // const { name, value } = e.target;
  // const bid = this.state;
  // bid[name] = value;
  this.setState((state) => ({
    ...state,
    bidValidity: date,
  }));
};

/**
 * format currency options to be parseable by the dropdown component
 */
formatCurrency = () => {
  const { currentProposal } = this.props;
  return {
    key: currentProposal.currency.symbol,
    text: currentProposal.currency.name.toUpperCase(),
    value: currentProposal.currency.id,
  };
}

handleQuestionAnswer = (e, q) => {
  console.log('This is the question being anwsered', q);
  // const { rfpQuestionResponses } = this.state;
  const { currentProposal } = this.props;
  // const question = rfpQuestionResponses.find((ques) => ques.id === q.id);
  const newAnswers = currentProposal.questions.map((ques) => {
    console.log('This is the existing question', ques);
    if (ques.id === q.id) {
      return {
        proposal_question_id: q.id,
        answer: e.target.value,
      };
    } return ques;
  });
  this.setState((state) => ({
    ...state,
    rfpQuestionResponses: newAnswers,
  }), () => console.log(this.state));
}

render() {
  const { totalBidValue, bidValidity } = this.state;
  const { currentProposal } = this.props;
  return (
	<MainContent
		help={Help}
	>
		<RfpTitle />
		<KtWrapper
			header="New Bid"
			canPerform
			actionName="Submit"
			handleAction={this.handleSubmit}
		>
			{currentProposal && (
				<ValidatorForm>
					<Divider title="Bid Details" type="thick" isNumbered number={1} />
					<div className="m-t-20">
						<FormGroup
							center
							type="amount"
							labelName=""
							label="Total Bid Amount"
							placeholder="Bid amount"
							selectDisabled
							inputValue={totalBidValue}
							selectOptions={[{ ...this.formatCurrency() }]}
							handleInputChange={(data) => this.handleAmountInputChange(data)}
						/>
					</div>
					<Divider classes="m-t-40" title="Reaponse To Questions" type="thick" isNumbered number={2} />
					{currentProposal.questions.length > 0 && currentProposal.questions.map((q) => (
						<div className="m-t-20" key={q.id}>
							<FormGroup
								inline={false}
								type="text"
								labelName=""
								label={q.question}
								placeholder="Type your response here"
								onChange={(e) => this.handleQuestionAnswer(e, q)}
							/>
						</div>
					))}
					{currentProposal.questions.length === 0 && (
						<EmptyContentWrapper message="No questions available" />
					)}
					<div className="m-t-40">
						<Divider title="Technical Proposal" type="thick" isNumbered number={3} />
						<div className="m-t-20">
							<Dropzone
								onFilesChange={(files) => this.addTechnicalProposal(files)}
							/>
						</div>
					</div>
					<div className="m-t-40">
						<Divider title="Commercial Proposal" type="thick" isNumbered number={4} />
						<div className="m-t-20">
							<Dropzone
								onFilesChange={(files) => this.addCommercialProposal(files)}
							/>
						</div>
					</div>
					<div className="m-t-40">
						<Divider title="Timeline" type="thick" isNumbered number={5} />
						<div className="m-t-20">
							<FormGroup
								inline
								center
								type="date"
								labelName="bidValidity"
								label="Bid Validity"
								placeholder="Type your response here"
								value={bidValidity}
								name="bidValidity"
								onChange={(data) => this.handleDateInputChange(data)}
							/>
						</div>
					</div>
				</ValidatorForm>
			)}
		</KtWrapper>
	</MainContent>
  );
}
}


const mapStateProps = (state) => ({
  currentProposal: state.supplierRfp.currentProposal,
  tenantUID: state.tenant.currentTenant.account_id,
});

const mapDispatchToProps = {
  respondToRfp: createBid,
};

export default connect(mapStateProps, mapDispatchToProps)(EventResponse);
