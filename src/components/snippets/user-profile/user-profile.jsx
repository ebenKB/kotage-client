/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './user-profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
import Can from '../../can/can';

const UserProfile = ({
  title, currentUser, accountType, handleLogout,
}) => {
  const signout = () => {
    handleLogout();
  };
  return (
	<Dropdown
		text={title}
		pointing="top right"
		className="user-profile"
	>
		<Dropdown.Menu>
			<Link to="/user-profile" className="item">
				<Dropdown.Item
					text="Your profile"
					icon="user"
					description=""
					className="kt-success"
				/>
			</Link>
			{currentUser && (
				<>
					<Can
						accountType={accountType}
						roleType={currentUser.is_admin ? 'admin' : 'user'}
						perform="user:view_all_users"
						yes={() => (
							<Link to="/users" className="item">
								<Dropdown.Item
									icon="folder"
									text="Users"
								/>
							</Link>
						)}
						no={() => null}
					/>
					<Can
						perform="user:invite"
						accountType={accountType}
						roleType={currentUser.is_admin ? 'admin' : 'user'}
						yes={() => (
							<Link to="/user/invitation" className="item">
								<Dropdown.Item
									icon="folder"
									text="Invite user"
								/>
							</Link>
						)}
						no={() => null}
					/>
					<Can
						perform="supplier:invite"
						accountType={accountType}
						roleType={currentUser.is_admin ? 'admin' : 'user'}
						yes={() => (
							<Link to="/supplier/invitation" className="item">
								<Dropdown.Item
									icon="folder"
									text="Invite Supplier"
								/>
							</Link>
						)}
						no={() => null}
					/>
					<Can
						perform="rfp:view"
						accountType={accountType}
						roleType={currentUser.is_admin ? 'admin' : 'user'}
						yes={() => (
							<Link to="/user/requisitions" className="item">
								<Dropdown.Item
									icon="folder"
									text="Your requisitions"
								/>
							</Link>
						)}
						no={() => null}
					/>
				</>
			)}
			<Link to="/help" className="item">
				<Dropdown.Item
					text="Help Center"
					icon="help circle"
					description=""
				/>
			</Link>
			<Link to="/user/settings" className="item">
				<Dropdown.Item
					text="Settings"
					icon="setting"
				/>
			</Link>
			<Dropdown.Divider />
			<Dropdown.Item
				icon="sign-out"
				text="Sign out"
				className="kt-danger"
				onClick={signout}
			/>
		</Dropdown.Menu>
	</Dropdown>
  );
};

const mapStateToProps = (state) => ({
  tenant: state.tenant.currentTenant,
  currentUser: state.user.currentUser,
  accountType: state.app.accountType,
});

const mapDispatchToProps = {
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
