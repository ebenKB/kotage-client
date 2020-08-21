/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { createBid, reviseExistingBid } from '../../../redux/actions/supplierBidActions';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';
import Dropzone from '../../dropzone/dropzone';
import { uploadFiles } from '../../../utils/app/index';
import { RFP_FOLDER_NAME } from '../../../utils/app/definitions';
import Collapsible from '../../snippets/collapsible/collapsible';
import FileItemCaption from '../../file-item-caption/file-item-caption';
import EmptyContentWrapper from '../../empty-content-wrapper/empty-content-wrapper';

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

updateTecnicalProposals = (newfiles) => {
  this.setState((state) => ({
    ...state,
    technicalRequirements: newfiles,
  }));
}

addCommercialProposal = (files) => {
  this.setState((state) => ({
    ...state,
    commercialRequirements: [...state.commercialRequirements, ...files],
  }));
}

updateCommercialProposals = (newFiles) => {
  this.setState((state) => ({
    ...state,
    commercialRequirements: newFiles,
  }));
};

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
    handleAction, respondToRfp, tenantUID, currentProposal, actionType,
  } = this.props;

  const { commercialRequirements, technicalRequirements } = this.state;

  // set the owner
  this.setState((state) => ({
    ...state,
    rfpID: currentProposal.id,
  }));

  /**
   * if the user want to edit, sort out the files that have alredy been uploaded to the server
   * and upload only those that are new
   */
  if (actionType.toLowerCase() === 'edit') {
    handleAction(this.state);
    // const existingCommReq = commercialRequirements
    //   .filter((c) => c.id !== undefined && c.id !== null);
    // const newCommReq = commercialRequirements.filter((c) => c.id === undefined);

    // // upload commercial requirements to remote server
    // const commercialReqFiles = await uploadFiles(newCommReq, tenantUID, RFP_FOLDER_NAME);
    // this.setState((state) => ({
    //   ...state,
    //   commercialRequirements: [
    //     ...commercialReqFiles,
    //     ...existingCommReq.map((e) => ({ id: e.id, title: e.title, url: e.file })),
    //   ],
    // }));

    // const existingTechReq = technicalRequirements
    //   .filter((t) => t.id !== undefined && t.id !== null);
    // const newTechReq = technicalRequirements.filter((t) => t.id === undefined);

    // // upload technical requirements to remote serve
    // const technicalReqFiles = await uploadFiles(newTechReq, tenantUID, RFP_FOLDER_NAME);
    // this.setState((state) => ({
    //   ...state,
    //   technicalRequirements: [
    //     ...technicalReqFiles,
    //     ...existingTechReq.map((e) => ({ id: e.id, title: e.title, url: e.file })),
    //   ],
    // }));

    // reviseBid(this.state, currentProposal.tenant.id);
  } else if (actionType.toLowerCase() === 'save') {
    // preformat currency using NAME_SYMBOL
    const { currency } = currentProposal;
    this.setState((state) => ({
      ...state,
      currency: `${currency.name}_${currency.symbol}`,
    }));

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

    respondToRfp(this.state, currentProposal.tenant.id);
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
    currentProposal, title, actionName, isRevisingBid,
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
			isLoadingSecondary={isRevisingBid}
		>
			{currentProposal && (
				<ValidatorForm
					onSubmit={this.handleSubmit}
				>
					<Divider title="Bid Details" type="thick" isNumbered number={1} />
					<div className="form-item m-t-20">
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
						<div className="m-t-20 form-item" key={q.id}>
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
						<EmptyContentWrapper message="The buyer did not ask any questions" />
					)}
					<div className="m-t-40">
						<Divider title="Technical Proposal" type="thick" isNumbered number={3} />
						<div className="m-t-20 form-item">
							{technicalRequirements && (
								<Collapsible
									title={`${technicalRequirements.length} existing files`}
									classes="m-b-20"
								>
									<div className="m-t-10">
										{technicalRequirements && technicalRequirements.map((t) => (
											<div className="" key={t.id}>
												<FileItemCaption file={t} handleDeleteFile={() => this.deleteBidFile(t, 'technical_req')} />
											</div>
										))}
									</div>
								</Collapsible>
							)}
							<Dropzone
								onFilesChange={(files) => this.addTechnicalProposal(files)}
							/>
						</div>
					</div>
					<div className="m-t-40">
						<Divider title="Commercial Proposal" type="thick" isNumbered number={4} />
						<div className="m-t-20 form-item">
							{commercialRequirements && (
								<Collapsible
									classes="m-b-20"
									title={`${commercialRequirements.length} existing files`}
								>
									<div className="m-t-10">
										{commercialRequirements && commercialRequirements.map((c) => (
											<div className="" key={c.id}>
												<FileItemCaption file={c} handleDeleteFile={() => this.deleteBidFile(c, 'commercial_req')} />
											</div>
										))}
									</div>
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
  isRevisingBid: state.ui.buyer.isRevisingBid,
});

const mapDispatchToProps = {
  respondToRfp: createBid,
  reviseBid: reviseExistingBid,
};

EventResponse.propTypes = {
  respondToRfp: PropTypes.func.isRequired,
  tenantUID: PropTypes.bool.isRequired,
  currentProposal: PropTypes.object.isRequired,
  actionType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actionName: PropTypes.string.isRequired,
  isRevisingBid: PropTypes.bool.isRequired,
  bid: PropTypes.object.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default connect(mapStateProps, mapDispatchToProps)(withRouter(EventResponse));
