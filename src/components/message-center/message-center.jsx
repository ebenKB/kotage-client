/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button, Dropdown, Menu,
} from 'semantic-ui-react';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import AddItem from '../snippets/add-item/add-item';
import './message-center.scss';
import Divider from '../kt-divider/divider';
import { ReactComponent as MessageIcon } from '../../svg/edit.svg';
import { getRfpInbox, getRfpOutbox } from '../../redux/actions/rfpActions';
import MessageOutbox from '../message-outbox/message-outbox';
import MessageInbox from '../message-inbox/message-inbox';
import RfpTitle from '../snippets/rfp-title/rfp-title';

const MessageCenter = () => {
  const [selectedOption, setSelectedOption] = useState({ text: 'Inbox', value: 1 });
  const history = useHistory();
  const options = [{
    key: 1,
    text: 'Inbox',
    value: 1,
  },
  {
    key: 2,
    text: 'Sent Messages',
    value: 2,
  },
  ];

  const handleChange = (data) => {
    setSelectedOption(() => ({ text: data.text, value: data.value }));
  };

  const handleClick = () => {
    history.push(`${history.location.pathname}/create/new`);
  };

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };
  return (
	<MainContent
		help={Help}
	>
		{/* <div className="m-t-20">
			<div className="big-caption bold">{proposal && proposal.title}</div>
			<Divider type="thick" title="" classes="m-b-10" />
		</div> */}
		<RfpTitle classes="m-t-20" />
		<KtWrapperLite
			classes="message-wrapper m-t-20"
		>
			<div className="text-center">
				<h3>Message Center</h3>
				<span>All your commmunication with your suppliers live here.</span>
			</div>
			<div className="m-t-20 m-b-20">
				<div className="flex-inline">
					<AddItem
						title="New Message"
						Logo={<MessageIcon className="kt-primary auto-height small logo" />}
						handleClick={handleClick}
					/>
					<Menu>
						<Dropdown
							placeholder=""
							item
							value={selectedOption.value}
							options={options}
							className="small blue"
							onChange={(e, data) => handleChange(data)}
						/>
					</Menu>
				</div>
				<Divider type="faint" classes="p-b-8 p-t-8" />
			</div>
			<div>
				<div className="message-center__body m-t-10">
					{(selectedOption.value === 1) && (
						<div className="m-t-20">
							<MessageInbox />
						</div>
					)}
					{(selectedOption.value === 2) && (
						<div className="m-t-20">
							<MessageOutbox
								canFetch={selectedOption.value === 2}
							/>
						</div>
					)}
				</div>
				<Divider type="faint" />
				<div className="text-right m-t-10">
					<Button
						content="Go Back"
						basic
						onClick={goBack}
					/>
				</div>
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

const mapDispatchToProps = {
  getInbox: getRfpInbox,
  getOutbox: getRfpOutbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  rfpOutbox: state.rfp.rfpOutbox,
  rfpInbox: state.rfp.rfpInbox,
  proposal: state.rfp.currentProposal,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);
