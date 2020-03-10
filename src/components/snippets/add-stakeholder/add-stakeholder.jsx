/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button } from 'semantic-ui-react';
// import { ReactComponent as Logo } from '../../../svg/plus.svg';
import { getUsers } from '../../../redux/actions/userActions';
import './add-stakeholder.scss';

const Stakeholders = ({
  className, getAllUsers, users, currentUser,
}) => {
  useEffect(() => {
    if (!users) {
      getAllUsers();
    }
  });

  const [stakeholder, setStakeholder] = useState();
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

  const formatUsers = () => {
    if (users) {
      const newUsers = users.map((u) => ({
        key: u.id,
        text: u.firstname,
        value: u.id,
        email: u.email,
      }));
      // all users belonging to this tenant can  be added as
      // stakeholders expect the user who is creating the proposal
      return newUsers.filter((user) => user.id !== currentUser.id);
    }
    return null;
  };

  // const handleClick = () => {

  // };

  const handlePermissionChange = (data) => {
    const { value } = data;
    console.log('Permission has changed', value);
    setStakeholder(value);
  };

  const handleStakeholderChange = (data) => {
    const { value } = data;
    console.log('This is the data that we want to set as stakeholder', value);
  };

  const addStakeholder = () => {
    console.log('This is the stakeholder', stakeholder);
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
						className="fluid"
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
						onClick={addStakeholder}
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
});

const mapDispatchToProps = {
  getAllUsers: getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stakeholders);
