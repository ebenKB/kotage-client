import React from 'react';
import PopupDropdown from '../snippets/popup/popup';
import NotificationIcon from '../notification-icon/notification-icon';
import './notification-content.scss';

const NotificationContent = () => (
	<PopupDropdown
		trigger={<NotificationIcon />}
		position="bottom center"
		classes="notification-popup"
	>
		<h3>Notification</h3>
		<div>
			MTN Ghana has invited you to a new proposals
		</div>
		<div>
			ASA saving and Loans has invited you to a new proposals
		</div>
	</PopupDropdown>
);

export default NotificationContent;
