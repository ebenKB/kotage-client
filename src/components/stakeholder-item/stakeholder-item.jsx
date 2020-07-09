/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from '../buttons/delete-button';


const StakeholderItem = ({
  stakeholder, currentUserId, removeStakeholder, mode,
}) => {
  const getAccessType = () => {
    if (parseInt(stakeholder.access_level, 10) === 2) {
      return (<div>Read & Write</div>);
    }
    return (<div> Read only</div>);
  };
  return (
	<div>
		<div className="form-item stake-holder__item m-t-10 m-b-10">
			<div>
				<span className="bold">
					{ stakeholder.firstname }
					{' '}
					{ stakeholder.lastname }
				</span>
				<span>
					<span>, </span>
					{ stakeholder.email }
				</span>
			</div>
			<div className="faint">{stakeholder.id === currentUserId ? 'RFP Owner' : getAccessType()}</div>
			{ mode !== 'readonly' && currentUserId !== stakeholder.id && (
				<div>
					<DeleteButton
						type="icon"
						handleAction={() => removeStakeholder(stakeholder.user_id)}
					/>
				</div>
			)}
		</div>
	</div>
  );
};

StakeholderItem.propTypes = {
  stakeholder: PropTypes.object.isRequired,
  currentUserId: PropTypes.number,
  removeStakeholder: PropTypes.func,
  mode: PropTypes.string,
};

StakeholderItem.defaultProps = {
  currentUserId: null,
  mode: 'write',
  removeStakeholder: null,
};

const mapStateToProps = (state) => ({
  currentUserId: (state.user.currentUser && state.user.currentUser.id),
});

export default connect(mapStateToProps, null)(StakeholderItem);
