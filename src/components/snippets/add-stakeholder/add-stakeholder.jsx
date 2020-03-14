/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button } from 'semantic-ui-react';
// import { ReactComponent as Logo } from '../../../svg/plus.svg';
import { getUsers } from '../../../redux/actions/userActions';
import './add-stakeholder.scss';
// import { addStakeholder } from '../../../redux/actions/rfpActions';

const Stakeholders = ({
  className, getAllUsers, users, currentUser, addNewStakeholder, shouldFetchData = false, loading,
}) => {
  const [stakeholder, setStakeholder] = useState();
  const [access_level, setAccessLevel] = useState();
  const [isTriggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!users && (shouldFetchData || isTriggered)) {
      getAllUsers();
    }
  });

  const options = [
    {
      key: '1',
      text: 'Read only',
      value: '1',
    },
    {
      key: '2',
      text: 'Read & Write',
      value: '2',
    },
  ];

  // This function takes an array of users and formats them in a way the dropdown can accept
  const formatUsers = () => {
    if (users) {
      const newUsers = users.map((u) => ({
        id: u.id,
        key: u.id,
        text: `${u.firstname} ${u.lastname}`,
        value: u,
        email: u.email,
      }));
      // all users belonging to this tenant can  be added as
      // stakeholders expect the user who is creating the proposal
      return newUsers.filter((user) => user.id !== currentUser.id);
    }
    return null;
  };

  /**
   * The function sets permissions for the user
   * @param {*} data the permission to set for the user
   */
  const handlePermissionChange = (data) => {
    const { value } = data;
    setAccessLevel(value);
  };

  /**
   * this function sets a stakeholder
   * @param {*} data the user to add as a stakeholder
   */
  const handleStakeholderChange = (data) => {
    const { value } = data;
    setStakeholder(value);
    console.log('This is the data that we want to set as stakeholder', value);
  };

  // confirm the user to add as a stakeholder
  const handleAddStakeholder = () => {
    console.log('Action called to add a stakeholder');
    addNewStakeholder(stakeholder, access_level);
  };

  return (
	<div className={`m-t-20 ${className}`}>
		<div>
			<div className="kt-stk__content m-t-20">
				<div>
					<Dropdown
						search
						selection
						options={formatUsers()}
						placeholder="Search by name or email"
						onChange={(e, data) => { handleStakeholderChange(data); }}
						onClick={() => { setTriggered(true); }}
						className="fluid"
						loading={loading}
					/>
				</div>
				<div>
					<Dropdown
						selection
						default="Read"
						options={options}
						placeholder="Permission"
						onChange={(e, data) => { handlePermissionChange(data); }}
					/>
				</div>
				<div>
					<Button
						content="Add"
						onClick={handleAddStakeholder}
						size="mini"
					/>
				</div>
			</div>
			{/* <div className="clickable m-t-20 kt-primary bold sm-caption flex-center"
        onClick={handleClick}>
				<Logo className="kt-logo__small kt-primary" />
				<span>Invite Stakeholder</span>
			</div> */}
		</div>
	</div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  currentUser: state.user.currentUser,
  loading: state.user.loading,
});

const mapDispatchToProps = {
  getAllUsers: getUsers,
  // addNewStakeholder: addStakeholder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stakeholders);
