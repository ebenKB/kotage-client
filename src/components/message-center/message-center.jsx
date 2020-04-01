import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import AddItem from '../snippets/add-item/add-item';
import './message-center.scss';
import Divider from '../kt-divider/divider';
import { ReactComponent as MenuIcon } from '../../svg/menu.svg';
import { ReactComponent as MessageIcon } from '../../svg/edit.svg';

const MessageCenter = () => {
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
    console.log('This is the history', history);
    history.push(`${history.location.pathname}/new`);
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
			</div>
			<div className="message-center__heading">
				<h4>Message</h4>
				<h4 className="text-right">Date received</h4>
			</div>
			<div className="message-center__body m-t-10">
				<div>
					<div className="message-item m-t-15">
						<div>
							<span className="m-r-10">
								<MenuIcon className="very small logo" />
							</span>
							<span>I have a question about this request for proposal</span>
						</div>
						<div className="text-right">02/21/2020</div>
					</div>
					<Divider type="faint" />
				</div>
				<div>
					<div className="message-item m-t-15">
						<div>
							<span className="m-r-10">
								<MenuIcon className="very small logo" />
							</span>
							<span>I have a question about this request for proposal</span>
						</div>
						<div className="text-right">02/21/2020</div>
					</div>
					<Divider type="faint" />
				</div>
				<div>
					<div className="message-item m-t-15">
						<div>
							<span className="m-r-10">
								<MenuIcon className="very small logo" />
							</span>
							<span>I have a question about this request for proposal</span>
						</div>
						<div className="text-right">02/21/2020</div>
					</div>
					<Divider type="faint" />
				</div>
				<p className="kt-primary m-t-20">View 9 more messages</p>
			</div>
			<div className="text-right">
				<Button content="Go Back" basic />
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

export default MessageCenter;
