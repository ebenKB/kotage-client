/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox } from 'semantic-ui-react';
import './user-details.scss';
import { makeAdmin, revokeAdmin } from '../../../redux/actions/userActions';


const UserDetails = ({ user = { isAdmin: true } }) => {
  const [tempUser, setTempUser] = useState({ isAdmin: null });
  // const user = {
  //   id: 999,
  //   name: 'Dorcas Dashie',
  //   email: 'example@dropbox.com',
  // };

  const setAdminStatus = (value) => {
    setTempUser(() => ({
      isAdmin: value,
    }));

    console.log('This is the value that we wnat to set as admin', value);
    setTimeout(() => {
      if (tempUser.isAdmin !== user.isAdmin) {
        console.log('There is still a change, so let us persis the change');
      }
    }, 500);
  };

  return (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
        DD
			</Label>
		</div>
		<div>
			<h2>Dorcas Dashie</h2>
			<div>blendy031@gmail.com</div>
			<div>dropbox@28323.apotica.net</div>
		</div>
		<div>
			<div>
				<Checkbox label="Admin" onChange={(e, data) => setAdminStatus(data.checked)} />
			</div>
			<div className="m-t-10">Reset Password</div>
		</div>
	</div>
  );
};

const mapDisptachToProps = {
  makeAdmin,
  revokeAdmin,
};

export default connect(null, mapDisptachToProps)(UserDetails);
