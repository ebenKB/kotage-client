/* eslint-disable react/jsx-fragments */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Label, Checkbox, Button } from 'semantic-ui-react';
import './user-details.scss';
import { setAdminStatus, sendPasswordResetToken, softDeleteUser } from '../../../redux/actions/userActions';
import Popup from '../popup/popup';


const UserDetails = ({
  user, setUserAsAdmin, resetPass, currentTenant, currentUser, type = 'user', deleteUser,
}) => {
  /**
   * this function toggles the admin status of the user
   * When called the function makes a request to the api without notifying the user
   * Any action performed is persisted to the database asynchronously
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
    deleteUser(user.id);
  };

  return (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
        EA
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
			<div>
				{user.id !== currentUser.user_id && currentUser.is_admin && (
					<Fragment>
						<Checkbox
							className="xsm-caption"
							label="Admin"
							onChange={(e, data) => handleSetAdminStatus(data.checked)}
							checked={user.is_admin}
						/>
						<Button
							className="kt-transparent block kt-danger"
							onClick={removeUser}
						>
              Delete user
						</Button>
					</Fragment>
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

// call actions from redux
const mapDisptachToProps = {
  setUserAsAdmin: setAdminStatus,
  resetPass: sendPasswordResetToken,
  deleteUser: softDeleteUser,
};

// call app state from redux
const mapStateToProps = (state) => ({
  currentTenant: state.tenant.currentTenant,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDisptachToProps)(UserDetails);
