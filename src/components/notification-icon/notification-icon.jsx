/* eslint-disable react/boolean-prop-naming */
import React from 'react';
import NotificationsNoneIcon from '@material-ui/icons/Notifications';
import './notification-icon.scss';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const NotificationIcon = ({ canShowNotification }) => (
	<>
		{canShowNotification === true && (
			<Link to="/supplier/notifications">
				<div className="custom-notification notification-icon">
					<NotificationsNoneIcon />
				</div>
			</Link>
		)}

		{canShowNotification === false && (
			<NotificationsNoneIcon className="custom-notification" />
		)}
	</>
);

NotificationIcon.propTypes = {
  canShowNotification: PropTypes.bool,
};
NotificationIcon.defaultProps = {
  canShowNotification: true,
};

export default NotificationIcon;
