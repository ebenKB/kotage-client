import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Form, Radio, Button,
} from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import Divider from '../../kt-divider/divider';
import { ReactComponent as QuoteIcon } from '../../../svg/quote.svg';
import { ReactComponent as ProposalIcon } from '../../../svg/proposal.svg';
import { ReactComponent as InformationIcon } from '../../../svg/information.svg';
import { ReactComponent as Check } from '../../../svg/check.svg';

import Help from '../../../utils/requisitions/new/help';

import '../rfx.scss';
import RfxOption from '../../rfx-option/rfx-option';

const Rfx = () => {
  const [selected, setSelected] = useState('');
  const [source, setSource] = useState('event');
  const history = useHistory();

  // allow the user to proceed to the next step
  const handleAction = () => {
    if (selected !== '') {
      if (selected === 'quote') {
        history.push('/rfx/quote/new');
      } else if (selected === 'proposal') {
        history.push('/rfx/proposal/create/new');
      } else if (selected === 'information') {
        history.push('/rfx/information/new');
      }
    }
  };

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
			cancelUrl="/rfx"
			handleAction={handleAction}
			isDisabled={selected === ''}
			isLoading={false}
		>
			<Form>
				<Divider
					type="thick"
					title="Select RFX Type"
					classes="m-t-10"
				/>
				<div className="m-t-40 m-b-40 sm-caption text-center">
            You can see the types of events you can create. Select the type you want and proceed
				</div>
				<ul className="rfx-content">
					<li className={`wrapper ${selected === 'quote' && 'active'}`}>
						<Button
							onClick={() => setSelected('quote')}
							className="kt-transparent"
						>
							<RfxOption
								title="Request for Quote"
							>
								<QuoteIcon className="kt-rfx__icon" />
								<div className="rfx-wrapper__caption">
									<Check className="small logo" />
								</div>
							</RfxOption>
						</Button>
					</li>
					<li className={`wrapper ${selected === 'proposal' && 'active'}`}>
						<Button
							onClick={() => setSelected('proposal')}
							className="kt-transparent"
						>
							<RfxOption
								title="Request for Proposal"
							>
								<ProposalIcon className="kt-rfx__icon" />
								<div className="rfx-wrapper__caption">
									<Check className="small logo" />
								</div>
							</RfxOption>
						</Button>
					</li>
					<li className={`wrapper ${selected === 'information' && 'active'}`}>
						<Button
							onClick={() => setSelected('information')}
							className="kt-transparent"
						>
							<RfxOption
								title="Request for Information"
							>
								<InformationIcon className="kt-rfx__icon" />
								<div className="rfx-wrapper__caption">
									<Check className="small logo" />
								</div>
							</RfxOption>
						</Button>
					</li>
				</ul>
				<Divider
					type="thick"
					title="Select Source"
					classes="m-t-20 m-b-20"
				/>
				<div className="form-group fluid kt-content__wrapper">
					<div>Source</div>
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
