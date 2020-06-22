/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import { connect } from 'react-redux';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';
import Dropzone from '../../dropzone/dropzone';

class EventResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalBidValue: null,
      questions: [
        {
          id: 1,
          question: 'How many years have you been in operations?',
        },
        {
          id: 2,
          question: 'How many years have you been in operations?',
        },
      ],
      technicalProposals: [
        {
          file: null,
        },
      ],
      commercialProposals: [
        {
          file: null,
        },
      ],
    };
  }

addTechnicalProposal = (files) => {
  this.setState((state) => ({
    ...state,
    technicalProposals: [...state.technicalProposals, ...files],
  }));
}

addCommercialProposal = (files) => {
  this.setState((state) => ({
    ...state,
    commercialProposals: [...state.commercialProposals, ...files],
  }));
}

handleSubmit = () => {
  console.log('We want to submit the form');
};

handleInputChange = ({ inputValue, selectedOption }) => {
  console.log('The input has changed', selectedOption, inputValue);
  this.setState((state) => ({
    ...state,
    totalBidValue: inputValue,
  }));
}

formatCurrency = () => {
  const { currentProposal } = this.props;
  return {
    key: currentProposal.currency.id,
    text: currentProposal.currency.name.toUpperCase(),
    value: currentProposal.currency.id,
  };
}

render() {
  const { questions, totalBidValue } = this.state;
  const { currentProposal } = this.props;
  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Bid Response"
			canPerform
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
							inputValue={totalBidValue}
							selectOptions={[{ ...this.formatCurrency() }]}
							handleInputChange={(data) => this.handleInputChange(data)}
						/>
					</div>

					<Divider classes="m-t-40" title="Reaponse To Questions" type="thick" isNumbered number={2} />
					{questions.map((q) => (
						<div className="m-t-20" key={q.id}>
							<FormGroup
								inline={false}
								type="text"
								labelName=""
								label={q.question}
								placeholder="Type your response here"
							/>
						</div>
					))}
					<div className="m-t-40">
						<Divider title="Technical Proposal" type="thick" isNumbered number={3} />
						<div className="m-t-20">
							<Dropzone
								onFilesChange={this.addTechnicalProposal}
							/>
						</div>
					</div>
					<div className="m-t-40">
						<Divider title="Commercial Proposal" type="thick" isNumbered number={4} />
						<div className="m-t-20">
							<Dropzone
								onFilesChange={this.addCommercialProposal}
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
});

export default connect(mapStateProps, null)(EventResponse);
