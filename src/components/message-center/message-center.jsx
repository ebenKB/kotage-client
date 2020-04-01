import React from 'react';
import { Button } from 'semantic-ui-react';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import AddItem from '../snippets/add-item/add-item';
import './message-center.scss';
import Divider from '../kt-divider/divider';
import { ReactComponent as MenuIcon } from '../../svg/menu.svg';

const MessageCenter = () => (
	<MainContent
		help={Help}
	>
		<KtWrapperLite
			classes="m-t-20"
		>
			<div className="text-center">
				<h3>Message Center</h3>
				<span>All your commmunication with your suppliers live here.</span>
			</div>
			<div className="m-t-20 m-b-20">
				<AddItem
					title="New Message"
				/>
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
			</div>
			<div className="text-right">
				<Button content="Close" basic />
			</div>
		</KtWrapperLite>
	</MainContent>
);

export default MessageCenter;
