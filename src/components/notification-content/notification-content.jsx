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
			There is some content here
		</div>
	</PopupDropdown>
);

export default NotificationContent;
