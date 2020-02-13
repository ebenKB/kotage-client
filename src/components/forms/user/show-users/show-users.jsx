import React from 'react';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import MainContent from '../../../kt-main-content/mainContent';
import UserDetails from '../../../snippets/user-details/user-details';

const showUsers = () => (
	<div>
		<MainContent>
			<KtWrapper
				header="Users"
				link="user/invitation"
				linkName="Invite User"
			>
				<UserDetails />
				<UserDetails />
				<UserDetails />
				<UserDetails />
			</KtWrapper>
		</MainContent>
	</div>
);

export default showUsers;
