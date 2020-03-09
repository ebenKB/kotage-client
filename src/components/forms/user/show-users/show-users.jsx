/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import MainContent from '../../../kt-main-content/mainContent';
import UserDetails from '../../../snippets/user-details/user-details';
import { getUsers, getInvitations } from '../../../../redux/actions/userActions';
import Help from '../../../../utils/requisitions/new/help';

import './show-users.scss';

class showUsers extends React.Component {
  componentDidMount() {
    const { getAllUsers, getAllInvitations } = this.props;
    // fetch all users from here
    getAllUsers();
    getAllInvitations();
  }

  render() {
    const { users, invitations } = this.props;
    return (
	<div>
		<MainContent
			classes="m-t-20"
			help={Help}
		>
			<KtWrapper
				header="Users"
				link="user/invitation"
				linkName="Invite User"
				isDiabled={false}
				isloading={false}
			>
				<div className="user-content">
					{users && users.map((u) => (
						<UserDetails
							key={u.id}
							user={u}
						/>
					))}
					{invitations && invitations.map((u) => (
						<UserDetails
							key={u.id}
							user={u}
							type="invitation"
						/>
					))}
				</div>
			</KtWrapper>
		</MainContent>
	</div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  invitations: state.user.userInvitations,
});

const mapDispatchToProps = {
  getAllUsers: getUsers,
  getAllInvitations: getInvitations,
};

export default connect(mapStateToProps, mapDispatchToProps)(showUsers);
