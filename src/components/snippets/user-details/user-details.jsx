/* eslint-disable react/jsx-fragments */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox, Button } from 'semantic-ui-react';
import './user-details.scss';
import {
  setAdminStatus, sendPasswordResetToken, softDeleteUser, resendUserInvitation,
  softDeleteInvitation,
} from '../../../redux/actions/userActions';
import Popup from '../popup/popup';
import { getInitialNames } from '../../../utils/app';

/**
 * This component displays a user or an invitation and enforces SEPARATION OF ROLES
 * Before making modifications to this component, please do well to
 * understand the user flow and the roles each user can perform.
 */
const UserDetails = ({
  user, setUserAsAdmin, resetPass, currentTenant, currentUser, type = 'user',
  deleteUser, resendInvitation, deleteInvitation,
}) => {
  /**
   * When called, the function DELIBERATELY makes a request to the api without notifying the user
   * @param {*} value the new value to set for the use. Either true or false
   */
  const handleSetAdminStatus = (value) => {
    const newUser = user;
    newUser.is_admin = value;
    setUserAsAdmin(newUser);
  };

  /**
   * This function makes an api request to the server to
   * send password reset instructions to the seclected user
   */
  const sendResetPassInstructions = () => {
    resetPass(user.email);
  };

  /**
 * This function sends a delete request to the api
 * When successful, the user will be deleted from the database
 */
  const removeUser = () => {
    // check if it is user or it is an invitation
    if (type === 'user') {
      deleteUser(user.id);
    } else {
      deleteInvitation(user.id);
    }
  };

  /**
   * check if the object we are showing is a user or an invitation
   * We check this because, this component can be used to show both a user and an invitation
   */
  const isUserAdmin = () => (((type === 'user' && user.id !== currentUser.id) && (currentUser.is_admin))
    || ((type === 'invitation') && (currentUser.is_admin)));

  const canDeleteUser = () => (currentUser.id !== user.id && currentUser.is_admin);

  return (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
				{getInitialNames(`${user.firstname} ${user.lastname}`)}
			</Label>
		</div>
		<div>
			<div className="name-caption">
				<h3>{`${user.firstname} ${user.lastname}`}</h3>
				{type === 'invitation' && (<span className="xsm-caption">Invited</span>)}
			</div>
			<div className="sm-caption">{user.email}</div>
			<div className="sm-caption">{user.email}</div>
		</div>
		<div className="xsm-caption">
			{currentTenant.email === user.email && (
				<div>Account owner</div>
			)}
			{/* check if the current user is an admin but the user is not the owner of this account */}
			{(currentUser.email === user.email) && currentUser.is_admin
        && !currentTenant.email === user.email && (<div className="xsm-caption">Admin</div>
			)}
			{/* show this only for ordinary users */}
			{(currentUser.email === user.email) && !currentUser.is_admin && (
				<div className="xsm-caption">User</div>
			)}
			<div>
				{isUserAdmin() && (
					<Fragment>
						<Checkbox
							className="xsm-caption"
							label="Admin"
							onChange={(e, data) => handleSetAdminStatus(data.checked)}
							checked={user.is_admin}
						/>
					</Fragment>
				)}
				{canDeleteUser() && (
					<Button
						className="kt-transparent block kt-danger"
						onClick={removeUser}
					>
            Delete user
					</Button>
				)}
			</div>
			{/* check whether we are showing a user and the user is not the owner of
       this account and also the user is not the currenlty logged in user */}
			{ type === 'user' && currentTenant.email !== user.email && currentUser.id !== user.id && (
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
                  Send reset instructions
								</Button>
							</div>
						</div>
					</Popup>
				</div>
			)}
			{type === 'invitation' && (
				<div className="">
					<Button
						className="kt-transparent light-text"
						onClick={() => resendInvitation(user)}
					>
						<span className="kt-primary"> Resend invitation</span>
					</Button>
				</div>
			)}
		</div>
	</div>
  );
};

// call actions from redux
const mapDisptachToProps = {
  setUserAsAdmin: setAdminStatus,
  resetPass: sendPasswordResetToken,
  deleteUser: softDeleteUser,
  deleteInvitation: softDeleteInvitation,
  resendInvitation: resendUserInvitation,
};

// call app state from redux
const mapStateToProps = (state) => ({
  currentTenant: state.tenant.currentTenant,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDisptachToProps)(UserDetails);
