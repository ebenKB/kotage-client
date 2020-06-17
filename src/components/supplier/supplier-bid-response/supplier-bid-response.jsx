/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';
import Dropzone from '../../dropzone/dropzone';
import AddItem from '../../snippets/add-item/add-item';

class EventResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

addTechnicalProposal = (file) => {
  console.log('', file);
}

addCommercialProposal = (file) => {
  console.log('', file);
}

render() {
  const { questions } = this.state;
  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Bid Response"
			canPerform
		>
			<ValidatorForm>
				<Divider title="Reaponse To Questions" type="thick" isNumbered number={1} />
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
					<Divider title="Technical Proposal" type="thick" isNumbered number={2} />
					<div className="m-t-20">
						<Dropzone />
					</div>
					<div className="m-t-20 float-r">
						<AddItem
							title="Add new document"
						/>
					</div>
				</div>
				<div className="m-t-40">
					<Divider title="Commercial Proposal" type="thick" isNumbered number={3} />
					<div className="m-t-20">
						<Dropzone />
					</div>
				</div>
				<div className="m-t-20 m-b-40 text-right">
					<AddItem
						title="Add new document"
					/>
				</div>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
  );
}
}

export default EventResponse;
