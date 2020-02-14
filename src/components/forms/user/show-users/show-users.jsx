/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { connect } from 'react-redux';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import MainContent from '../../../kt-main-content/mainContent';
import UserDetails from '../../../snippets/user-details/user-details';
import { getUsers } from '../../../../redux/actions/userActions';
import './show-users.scss';

class showUsers extends React.Component {
  componentDidMount() {
    const { getAllUsers } = this.props;
    // fetch all users from here
    getAllUsers();
  }

  render() {
    const { users } = this.props;
    return (
	<div>
		<MainContent>
			<KtWrapper
				header="Users"
				link="user/invitation"
				linkName="Invite User"
			>
				<div className="user-content">
					{users && users.map((u) => (
						<UserDetails
							key={u.id}
							user={u}
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
});

const mapDispatchToProps = {
  getAllUsers: getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(showUsers);
