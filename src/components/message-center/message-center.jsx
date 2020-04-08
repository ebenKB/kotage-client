/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
// import shortid from 'shortid';
// import { PropTypes } from 'prop-types';
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
// import MessageItem from './message-item/message-item';
import { getRfpInbox, getRfpOutbox } from '../../redux/actions/rfpActions';
import MessageOutbox from '../message-outbox/message-outbox';
import MessageInbox from '../message-inbox/message-inbox';


const MessageCenter = () => {
  const [selectedOption, setSelectedOption] = useState({ text: 'Inbox (12)', value: 1 });
  useEffect(() => {
    if (selectedOption.value === 1) {
      // getInbox();
    } else if (selectedOption.value === 2) {
      // getOutbox();
    }
  }, [selectedOption]);
  // const [selectedMessage, setSelectedMessage] = useState(null);
  const history = useHistory();
  const options = [{
    key: 1,
    text: 'Inbox (12)',
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
    history.push(`${history.location.pathname}/new`);
  };

  const goBack = () => {
    if (history) {
      history.goBack();
    }
  };

  // const handleMessagePreview = (msg) => {
  //   setSelectedMessage(() => msg);
  // };

  return (
	<MainContent
		help={Help}
	>
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
						Logo={<MessageIcon className="kt-primary auto-height medium logo" />}
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
			</div>
			{/* {selectedMessage !== null && (
				<div className="message-preview">
					<div className="flex-center">
						<Button className="kt-transparent" onClick={() => setSelectedMessage(() => null)}>
							<BackArrow className="m-r-20 medium logo auto-height" />
						</Button>
						<Link to="/">
							<Button className="flex-center">
								<Reply className="m-r-5 medium logo auto-height" />
								<span>reply</span>
							</Button>
						</Link>
					</div>
					<Divider type="faint" />
					<div className="m-t-20 message-preview__body">
						{selectedMessage.message}
					</div>
				</div>
			)} */}
			<div>
				<div className="message-center__heading">
					<h4>Messages sent to suppliers</h4>
					{/* <h4 className="text-right">Date received</h4> */}
				</div>
				<div className="message-center__body m-t-10">
					{(selectedOption.value === 1) && (
						<div className="m-t-40">
							<MessageInbox />
						</div>
					)}
					{(selectedOption.value === 2) && (
						<div className="m-t-40">
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

MessageCenter.propTypes = {
  // getInbox: PropTypes.func.isRequired,
  // getOutbox: PropTypes.func.isRequired,
  // rfpOutbox: PropTypes.array.isRequired,
  // rfpInbox: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  getInbox: getRfpInbox,
  getOutbox: getRfpOutbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  rfpOutbox: state.rfp.rfpOutbox,
  rfpInbox: state.rfp.rfpInbox,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);
