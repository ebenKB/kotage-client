/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox, Button } from 'semantic-ui-react';
import './user-details.scss';
import { setAdminStatus } from '../../../redux/actions/userActions';
import Popup from '../popup/popup';


const UserDetails = ({ user, setUserAsAdmin }) => {
  // const user = {
  //   id: 999,
  //   name: 'Dorcas Dashie',
  //   email: 'example@dropbox.com',
  // };

  const handleSetAdminStatus = (value) => {
    const newUser = user;
    newUser.is_admin = value;
    setUserAsAdmin(newUser);
  };

  const sendResetPassInstructions = () => {
    console.log('we are send the instructions to', user);
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
				<Checkbox label="Admin" onChange={(e, data) => handleSetAdminStatus(data.checked)} checked={user.is_admin} />
			</div>
			<div className="m-t-10">
				<Popup
					position="top center"
					trigger="Reset password"
					classes="user-details"
				>
					<div className="popup-wrapper">
						{/* <div className="popup-header">
							<p>Did nameOfUser forget how to login?</p>
						</div> */}
						<div className="popup-body">
							<p>Send an email to this user that explains how to set a new password</p>
							<Button
								size="tiny"
								fluid
								color="green"
								onClick={sendResetPassInstructions}
							>
								{' '}
                Send signin instructions
							</Button>
						</div>
					</div>
				</Popup>
			</div>
		</div>
	</div>
  );
};

const mapDisptachToProps = {
  setUserAsAdmin: setAdminStatus,

};

export default connect(null, mapDisptachToProps)(UserDetails);
