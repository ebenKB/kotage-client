import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import { PropTypes } from 'prop-types';
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
import { ReactComponent as BackArrow } from '../../svg/return.svg';
import MessageItem from './message-item/message-item';
import KtLoader from '../loader/loader';
import { getRfpInbox } from '../../redux/actions/rfpActions';


const MessageCenter = ({ isLoading, getInbox }) => {
  const messages = [
    {
      id: shortid.generate(),
      message: 'Can you extend the deadline for Apotica?',
      date: '02/12/2020',
    },
    {
      id: shortid.generate(),
      message: 'HP 459pc is out of service. Can we replace that model with HP5060 pc which is the newest model?',
      date: '02/18/2020',
    },
    {
      id: shortid.generate(),
      message: 'Please provide a vivid description about the quantity and delivery locations.',
      date: '02/19/2020',
    },
    {
      id: shortid.generate(),
      message: 'We appreciate the extension of the bid deadline. But can you extend the question deadline too?',
      date: '03/31/2020',
    },
    {
      id: shortid.generate(),
      message: 'Will the items be received at the head office or your local branches?',
      date: '02/13/2020',
    },
    {
      id: shortid.generate(),
      message: 'Thank you very much. I have recieved the description of the products.',
      date: '04/11/2020',
    },
  ];
  useEffect(() => {
    if (isLoading) {
      getInbox();
    }
  }, [isLoading]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState({ text: 'Inbox (12)', value: 1 });
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

  const handleMessagePreview = (msg) => {
    setSelectedMessage(() => msg);
  };

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
			{selectedMessage !== null && (
				<div className="message-preview">
					<Button className="kt-transparent" onClick={() => setSelectedMessage(() => null)}>
						<BackArrow className="medium logo auto-height" />
					</Button>
					<Divider type="faint" />
					<div className="m-t-20 message-preview__body">
						{selectedMessage.message}
					</div>
				</div>
			)}
			<div>
				<div className="message-center__heading">
					<h4>Message</h4>
					<h4 className="text-right">Date received</h4>
				</div>
				{isLoading && (
					<div className="m-t-40">
						<KtLoader />
					</div>
				)}
				<div className="message-center__body m-t-10">
					{!isLoading && (

						<div>
							{messages.map((m) => (
								<MessageItem
									key={m.id}
									message={m}
									handleAction={(message) => handleMessagePreview(message)}
								/>
							))}
							<p className="kt-primary m-t-40">View 9 more messages</p>
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
  isLoading: PropTypes.bool.isRequired,
  getInbox: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getInbox: getRfpInbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);
