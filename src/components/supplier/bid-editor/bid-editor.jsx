/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { createBid, reviseExistingBid } from '../../../redux/actions/supplierBidActions';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';
import Dropzone from '../../dropzone/dropzone';
import { uploadFiles } from '../../../utils/app/index';
import { RFP_FOLDER_NAME } from '../../../utils/app/definitions';
import { ReactComponent as CloseIcon } from '../../../svg/close.svg';
import Collapsible from '../../snippets/collapsible/collapsible';

class EventResponse extends Component {
  constructor(props) {
    super(props);

    const { bid } = this.props;
    this.state = {
      ...bid,
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

deleteBidFile = (file, type) => {
  if (type === 'commercial_req') {
    const { commercialRequirements } = this.state;
    const newFiles = commercialRequirements.filter((c) => c.id !== file.id);
    this.setState((state) => ({
      ...state,
      commercialRequirements: newFiles,
    }));
  } else if (type === 'technical_req') {
    const { technicalRequirements } = this.state;
    const newFiles = technicalRequirements.filter((t) => t.id !== file.id);
    this.setState((state) => ({
      ...state,
      technicalRequirements: newFiles,
    }));
  }
};

handleSubmit = async () => {
  const {
    respondToRfp, reviseBid, tenantUID, currentProposal: { id }, actionType,
  } = this.props;
  const { commercialRequirements, technicalRequirements } = this.state;

  // set the owner
  this.setState((state) => ({
    ...state,
    rfpID: id,
  }));

  /**
   * if the user want to edit, sort out the files that have alredy been uploaded to the server
   * and upload only those that are new
   */
  if (actionType === 'edit') {
    const existingCommReq = commercialRequirements.filter((c) => c.id !== null);
    const newCommReq = commercialRequirements.filter((c) => c.id === null);

    // upload commercial requirements to remote server
    const commercialReqFiles = await uploadFiles(newCommReq, tenantUID, RFP_FOLDER_NAME);
    this.setState((state) => ({
      ...state,
      commercialRequirements: [
        ...commercialReqFiles,
        ...existingCommReq.map((e) => ({ title: e.title, url: e.file })),
      ],
    }));

    const existingTechReq = technicalRequirements.filter((t) => t.id !== null);
    const newTechReq = technicalRequirements.filter((t) => t.id === null);

    // upload technical requirements to remote serve
    const technicalReqFiles = await uploadFiles(newTechReq, tenantUID, RFP_FOLDER_NAME);
    this.setState((state) => ({
      ...state,
      technicalRequirements: [
        ...technicalReqFiles,
        ...existingTechReq.map((e) => ({ title: e.title, url: e.file })),
      ],
    }));

    // preformat currency
    const { currency } = this.state;
    this.setState((state) => ({
      ...state,
      currency: `${currency.name}_${currency.symbol}`,
    }));
  } else if (actionType === 'save') {
    // upload commercial requirements to remote server
    const commercialReqFiles = await
    uploadFiles(commercialRequirements, tenantUID, RFP_FOLDER_NAME);
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
  }

  const { currentProposal } = this.props;
  if (actionType.toLowerCase() === 'save') {
    respondToRfp(this.state, currentProposal.tenant.id);
  } else if (actionType.toLowerCase() === 'edit') {
    console.log('We want to edit the proposal', this.state);
    reviseBid(this.state, currentProposal.tenant.id);
  }
};

handleInputChange = ({ inputValue, selectedOption }) => {
  this.setState((state) => ({
    ...state,
    totalBidValue: inputValue,
  }));
  this.setBidCurrency(selectedOption);
}

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
  const { rfpQuestionResponses } = this.state;
  // const question = rfpQuestionResponses.find((ques) => ques.id === q.id);
  const newAnswers = rfpQuestionResponses.map((ques) => {
    if (ques.id === q.id) {
      return {
        question_id: q.id,
        answer: e.target.value,
      };
    } return ques;
  });
  this.setState((state) => ({
    ...state,
    rfpQuestionResponses: newAnswers,
  }));
}

render() {
  const { totalBidValue, technicalRequirements, commercialRequirements } = this.state;
  const {
    currentProposal, title, actionName,
  } = this.props;
  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header={title}
			canPerform
			actionName={actionName}
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
							handleInputChange={(data) => this.handleInputChange(data)}
						/>
					</div>
					<Divider classes="m-t-40" title="Reaponse To Questions" type="thick" isNumbered number={2} />
					{currentProposal.length > 0 && currentProposal.questions.map((q) => (
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
						<div className="m-t-20">The buyer did not ask any questions</div>
					)}
					<div className="m-t-40">
						<Divider title="Technical Proposal" type="thick" isNumbered number={3} />
						<div className="m-t-20">
							{technicalRequirements && (
								<Collapsible
									title={`${technicalRequirements.length} existing files`}
									classes="m-b-20"
								>
									{technicalRequirements && technicalRequirements.map((t) => (
										<div className="p-l-50 p-r-50">
											<div className="fluid flex-center space-between">
												<p>{t.title}</p>
												<Button
													size="tiny"
													content={<CloseIcon className="small dark logo" />}
													className="kt-transparent"
													onClick={() => this.deleteBidFile(t, 'technical_req')}
												/>
											</div>
											<Divider type="faint" classes="m-t-5 m-b-5" />
										</div>
									))}
								</Collapsible>
							)}
							<Dropzone
								existingFiles={technicalRequirements.map((f) => ({ data: f }))}
								onFilesChange={(files) => this.addTechnicalProposal(files)}
							/>
						</div>
					</div>
					<div className="m-t-40">
						<Divider title="Commercial Proposal" type="thick" isNumbered number={4} />
						<div className="m-t-20">
							{commercialRequirements && (
								<Collapsible
									classes="m-b-20"
									title={`${commercialRequirements.length} existing files`}
								>
									{commercialRequirements && commercialRequirements.map((c) => (
										<div className="p-l-50 p-r-50">
											<div className="fluid flex-center space-between">
												<p>{c.title}</p>
												<Button
													size="tiny"
													content={<CloseIcon className="small dark logo" />}
													className="kt-transparent"
													onClick={() => this.deleteBidFile(c, 'commercial_req')}
												/>
											</div>
											<Divider type="faint" classes="m-t-5 m-b-5" />
										</div>
									))}
								</Collapsible>
							)}
							<Dropzone
								onFilesChange={(files) => this.addCommercialProposal(files)}
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
  reviseBid: reviseExistingBid,
};

export default connect(mapStateProps, mapDispatchToProps)(EventResponse);
