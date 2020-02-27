import React, { useState } from 'react';
import {
  Form, Radio, Button,
} from 'semantic-ui-react';
import MainContent from '../kt-main-content/mainContent';
import KtWrapper from '../kt-wrapper/kt-wrapper';
import Divider from '../kt-divider/divider';
import { ReactComponent as QuoteIcon } from '../../svg/quote.svg';
import { ReactComponent as ProposalIcon } from '../../svg/proposal.svg';
import { ReactComponent as InformationIcon } from '../../svg/information.svg';
import Help from '../../utils/requisitions/new/help';

import './rfx.scss';
import RfxItem from '../rfx-item/rfx-item';

const Rfx = () => {
  const [selected, setSelected] = useState('');
  const [source, setSource] = useState('event');

  return (
	<MainContent
		classes="m-t-20"
		help={Help}
	>
		<KtWrapper
			header="New Event"
			canFilter={false}
			canPerform
			actionName="Continue"
		>
			<Form>
				<Divider
					type="thick"
					title="Select RFX Type"
					classes="m-t-10"
				/>
				<div className="m-t-40 m-b-40 bold light-caption text-center">
              You can see the types of events you can create. Select the type you want and proceed
				</div>
				<ul className="rfx-content">
					<li className={`wrapper ${selected === 'quote' && 'active'}`}>
						<Button
							onClick={() => setSelected('quote')}
							className="kt-transparent"
						>
							<RfxItem
								title="Request for Quote"
							>
								<QuoteIcon className="kt-rfx__icon" />
							</RfxItem>
						</Button>
					</li>
					<li className={`wrapper ${selected === 'proposal' && 'active'}`}>
						<Button
							onClick={() => setSelected('proposal')}
							className="kt-transparent"
						>
							<RfxItem
								title="Request for Proposal"
							>
								<ProposalIcon className="kt-rfx__icon" />
							</RfxItem>
						</Button>
					</li>
					<li className={`wrapper ${selected === 'information' && 'active'}`}>
						<Button
							onClick={() => setSelected('information')}
							className="kt-transparent"
						>
							<RfxItem
								title="Request for Information"
							>
								<InformationIcon className="kt-rfx__icon" />
							</RfxItem>
						</Button>
					</li>
				</ul>
				<Divider
					type="thick"
					title="Select Source"
					classes="m-t-40 m-b-40"
				/>
				<div className="form-group fluid kt-content__wrapper">
					<div className="bold">Source</div>
					<div className="flex-wrapper">
						<Form.Field className={`custom radio ${source === 'event' ? 'active' : 'idle'}`}>
							<Radio
								label="Blank Event"
								name="radioGroup"
								value={source}
								onChange={() => setSource('event')}
								checked={source === 'event'}
							/>
						</Form.Field>
						<Form.Field className={`custom radio ${source === 'blank' ? 'active' : 'idle'}`}>
							<Radio
								label="From a Proposal"
								name="radioGroup"
								value={source}
								onChange={() => setSource('blank')}
								checked={source === 'blank'}
							/>
						</Form.Field>
					</div>
				</div>
			</Form>
		</KtWrapper>
	</MainContent>
  );
};

export default Rfx;
