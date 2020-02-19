/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './user-profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserProfile = ({ title }) => {
  const logout = () => {
    console.log('we want to logout');
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
