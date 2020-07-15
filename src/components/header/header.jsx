/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import './header.scss';
// import NotificationContent from '../notification-content/notification-content';
import { ReactComponent as Kotage } from '../../svg/kotage.svg';
import Search from '../form-fields/search-input/search-input';
import UserProfile from '../snippets/user-profile/user-profile';
// import PopupDropdown from '../snippets/popup/popup';
// import NotificationIcon from '../notification-icon/notification-icon';
import NotificationIcon from '../notification-icon/notification-icon';

const header = ({ currentUser }) => (
	<div className="header">
		<div className="content">
			<div>
				<Kotage className="kotage-logo" />
			</div>
			<Search />
			<div>
				<div className="float-r flex-center">
					<div className="m-r-10">
						<NotificationIcon />
					</div>
					<UserProfile
						title={(currentUser && currentUser.firstname && currentUser.lastname) && `${currentUser.firstname} ${currentUser.lastname}`}
					/>
				</div>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(header);
