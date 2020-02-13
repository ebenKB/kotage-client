/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox } from 'semantic-ui-react';
import './user-details.scss';
import { makeAdmin, revokeAdmin } from '../../../redux/actions/userActions';


const UserDetails = ({ user, setUserAsAdmin }) => {
  // const user = {
  //   id: 999,
  //   name: 'Dorcas Dashie',
  //   email: 'example@dropbox.com',
  // };

  const setAdminStatus = (value) => {
    const newUser = user;
    newUser.is_admin = value;
    setUserAsAdmin(newUser);
  };

  return (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
        DD
			</Label>
		</div>
		<div>
			<h2>{`${user.firstname} ${user.lastname}`}</h2>
			<div>{user.email}</div>
			<div>{user.email}</div>
		</div>
		<div>
			<div>
				<Checkbox label="Admin" onChange={(e, data) => setAdminStatus(data.checked)} checked={user.is_admin} />
			</div>
			<div className="m-t-10">Reset Password</div>
		</div>
	</div>
  );
};

const mapDisptachToProps = {
  setUserAsAdmin: makeAdmin,
  revokeAdmin,
};

export default connect(null, mapDisptachToProps)(UserDetails);
