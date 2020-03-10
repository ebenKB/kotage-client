/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import './stakeholders.scss';
import { Dropdown } from 'semantic-ui-react';
import Input from '../../form-fields/input/input';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import DeleteButton from '../../buttons/delete-button';

const Stakeholders = ({ className }) => {
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

  const handleClick = () => {

  };

  const handlePermissionChange = (data) => {
    const { value } = data;
    console.log('Permission has changed', value);
  };

  return (
	<div className={`docs-group m-t-30 ${className}`}>
		<div className="bold">Stakeholders</div>
		<div>
			<div className="kt-stk-group__header bold light-caption">
				<div>Name or Email</div>
				<div>Permission</div>
			</div>
			<div className="kt-stk__content m-t-20">
				<div>
					<Input
						classes="fluid"
						placeholder="John Smith"
						type="text"
					/>
				</div>
				<div>
					<Dropdown
						selection
						options={options}
						placeholder="Event owner"
						onChange={(e, data) => { handlePermissionChange(data); }}
					/>
				</div>
				<div>
					<DeleteButton type="icon" />
				</div>
			</div>
			<div className="clickable m-t-20 kt-primary bold sm-caption flex-center" onClick={handleClick}>
				<Logo className="kt-logo__small kt-primary" />
				<span>Invite Stakeholder</span>
			</div>
		</div>
	</div>
  );
};

// const mapStateToProps = (state) => ({
//   users: state.user.users,
// });

export default connect(null, null)(Stakeholders);
