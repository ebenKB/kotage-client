import React from 'react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import help from '../../../utils/requisitions/index/help';
import RfxItem from '../../rfx-item/rfx-item';
import '../rfx.scss';
import Divider from '../../kt-divider/divider';

const RFX = () => (
	<MainContent
		classes="m-t-20 rfx"
		help={help}
	>
		<KtWrapper
			header="RFx"
			canPerform={false}
			canFilter={false}
			link="rfx/new"
			linkName="New"
		>
			<RfxItem type="Published" />
			<Divider type="faint" />
			<RfxItem type="Published" />
			<Divider type="faint" />
			<RfxItem type="Draft" />
			<Divider type="faint" />
			<RfxItem type="Published" />
			<Divider type="faint" />
			<RfxItem type="Published" />
			<Divider type="faint" />
			<RfxItem type="Draft" />
			<Divider type="faint" />
		</KtWrapper>
	</MainContent>
);

export default RFX;
