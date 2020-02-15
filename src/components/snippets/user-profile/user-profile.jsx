/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './user-profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

<<<<<<< HEAD
const UserProfile = () => {
  const logout = () => {
    console.log('we want to logout');
  };
  return (
=======
const UserProfile = ({ tenant }) => (
>>>>>>> add tenant account_id to users route
	<Dropdown
		text="John Smith"
		pointing="top right"
		className="user-profile"
	>
		<Dropdown.Menu>
<<<<<<< HEAD
			<Link to="/user-profile" className="item">
				<Dropdown.Item
					text="Your profile"
					icon="user"
					description=""
					className="kt-success"
				/>
			</Link>
			<Link to="/users" className="item">
				<Dropdown.Item
					icon="folder"
					text="Users"
				/>
			</Link>
			<Link to="/user/invitation" className="item">
				<Dropdown.Item
					icon="folder"
					text="Invite user"
				/>
			</Link>
			<Link to="/user/requisitions" className="item">
				<Dropdown.Item
					icon="folder"
					text="Your requisitions"
				/>
			</Link>
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
=======
			<Dropdown.Item
				text={(
					<Link to="/user-profile">
            Your profile
					</Link>
				)}
				icon="user"
				description=""
				className="kt-success"
			/>
			{tenant && (
				<Dropdown.Item
					icon="folder"
					text={(
						<Link to={`/${tenant.account_id}/users`}>
              Users
						</Link>
					)}
				/>
			)}
			<Dropdown.Item
				icon="folder"
				text={(
					<Link to="/user/invitation">
          Invite user
					</Link>
				)}
			/>
			<Dropdown.Item
				icon="folder"
				text={(
					<Link to="/user/requisitions">
          Your requisitions
					</Link>
				)}
			/>
			<Dropdown.Item
				text={(
					<Link to="/john/help">
            Help Center
					</Link>
				)}
				icon="help circle"
				description=""
			/>
			<Dropdown.Item
				text={(
					<Link to="/user/settings">
            Settings
					</Link>
				)}
				icon="setting"
			/>
>>>>>>> add tenant account_id to users route
			<Dropdown.Divider />
			<Dropdown.Item
				icon="sign-out"
				text="Sign out"
				className="kt-danger"
				onClick={logout}
			/>
		</Dropdown.Menu>
	</Dropdown>
  );
};

const mapStateToProps = (state) => ({
  tenant: state.tenant.currentTenant,
});

export default connect(mapStateToProps, null)(UserProfile);
