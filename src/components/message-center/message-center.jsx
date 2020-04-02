import React, { useState } from 'react';
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

const MessageCenter = () => {
  const [selectedMessage] = useState(null);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState({ text: 'Inbox', value: 1 });
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
    history.push(`${history.location.pathname}/new`);
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
					<BackArrow className="small logo auto-height" />
					<div className="m-t-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusamus earum suscipit, ipsum qui alias veritatis delectus
            at enim voluptatem est modi distinctio maxime facere ea
            itaque fuga aliquam. Ratione, eligendi.
					</div>
				</div>
			)}
			{selectedMessage === null && (
				<div>
					<div className="message-center__heading">
						<h4>Message</h4>
						<h4 className="text-right">Date received</h4>
					</div>
					<div className="message-center__body m-t-10">
						<MessageItem />
						<MessageItem />
						<MessageItem />
						<p className="kt-primary m-t-20">View 9 more messages</p>
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
			)}
		</KtWrapperLite>
	</MainContent>
  );
};

export default MessageCenter;
