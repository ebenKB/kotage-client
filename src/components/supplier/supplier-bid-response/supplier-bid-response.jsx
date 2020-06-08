import React from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import FormGroup from '../../form-fields/form-group/form-group';
import Divider from '../../kt-divider/divider';

const EventResponse = () => (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Bid Response"
		>
			<ValidatorForm>
				<Divider title="Reaponse Details" type="thick" />
				<div className="m-t-20">
					<FormGroup
						type="text"
						labelName="Bid Amount"
						label="Bid Amount"
					/>
				</div>
				<div className="m-t-20">
					more fields
				</div>
			</ValidatorForm>
		</KtWrapper>
	</MainContent>
);

export default EventResponse;
