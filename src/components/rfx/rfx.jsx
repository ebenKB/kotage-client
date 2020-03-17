import React from 'react';
import MainContent from '../kt-main-content/mainContent';
import KtWrapper from '../kt-wrapper/kt-wrapper';
import help from '../../utils/requisitions/index/help';

const RFX = () => (
	<MainContent
		classes="m-t-20"
		help={help}
	>
		<KtWrapper
			header="RFx"
			canPerform={false}
			canFilter={false}
			link="rfx/new"
			linkName="New"
		>
      show all rfx here
		</KtWrapper>
	</MainContent>
);

export default RFX;
