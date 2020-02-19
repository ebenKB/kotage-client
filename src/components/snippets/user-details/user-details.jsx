/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox, Button } from 'semantic-ui-react';
import './user-details.scss';
import { setAdminStatus, sendPasswordResetToken } from '../../../redux/actions/userActions';
import Popup from '../popup/popup';


const UserDetails = ({
  user, setUserAsAdmin, resetPass, currentTenant, currentUser,
}) => {
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
    resetPass(user.email);
  };

  return (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
        DD
			</Label>
		</div>
		<div>
			<div className="name-caption">
				<h3>{`${user.firstname} ${user.lastname}`}</h3>
				{!user.tenant_id && (<span className="xsm-caption">Invited</span>)}
			</div>
			<div className="sm-caption">{user.email}</div>
			<div className="sm-caption">{user.email}</div>
		</div>
		<div className="xsm-caption">
			{currentTenant.email === user.email && (
				<div>Account owner</div>
			)}
			<div>
				{user.id !== currentUser.user_id && currentUser.is_admin && (
					<Checkbox className="xsm-caption" label="Admin" onChange={(e, data) => handleSetAdminStatus(data.checked)} checked={user.is_admin} />
				)}
			</div>
			{currentTenant.email !== user.email && (
				<div className="m-t-10">
					<Popup
						position="top center"
						trigger="Reset password"
						classes="user-details"
					>

						<div className="popup-wrapper">
							<div className="popup-body">
								<p>Send an email to this user that explains how to set a new password</p>
								<Button
									size="tiny"
									fluid
									color="green"
									onClick={sendResetPassInstructions}
								>
									{' '}
                    Send reset instructions
								</Button>
							</div>
						</div>
					</Popup>
				</div>
			)}
		</div>
	</div>
  );
};

const mapDisptachToProps = {
  setUserAsAdmin: setAdminStatus,
  resetPass: sendPasswordResetToken,
};

const mapStateToProps = (state) => ({
  currentTenant: state.tenant.currentTenant,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDisptachToProps)(UserDetails);
