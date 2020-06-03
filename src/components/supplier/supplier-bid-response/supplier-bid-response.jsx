import React from 'react';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';

const EventResponse = () => (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Bid Response"
		>
			We can response to events here
		</KtWrapper>
	</MainContent>
);

export default EventResponse;
