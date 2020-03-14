/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './user-profile.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';

const UserProfile = ({ title, handleLogout }) => {
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
			<Link to="/supplier/invitation" className="item">
				<Dropdown.Item
					icon="folder"
					text="Invite Supplier"
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
				onClick={signout}
			/>
		</Dropdown.Menu>
	</Dropdown>
  );
};

const mapStateToProps = (state) => ({
  tenant: state.tenant.currentTenant,
});

const mapDispatchToProps = {
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
