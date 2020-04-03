/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import './header.scss';
import { ReactComponent as Kotage } from '../../svg/kotage.svg';
import Search from '../form-fields/search-input/search-input';
import UserProfile from '../snippets/user-profile/user-profile';

const header = ({ currentUser }) => (
	<div className="header">
		<div className="content">
			<div>
				<Kotage className="kotage-logo" />
			</div>
			<Search />
			<div>
				<UserProfile
					title={(currentUser && currentUser.firstname && currentUser.lastname) && `${currentUser.firstname} ${currentUser.lastname}`}
				/>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, null)(header);
