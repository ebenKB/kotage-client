/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import DeleteButton from '../buttons/delete-button';


const StakeholderItem = ({ stakeholder, currentUserId }) => (
	<div>
		<div className="form-item stake-holder__item m-t-10 m-b-10">
			<div>
				<span className="bold">
					{ stakeholder.firstname }
					{' '}
					{ stakeholder.lastname }
				</span>
				<span>
					<span>,</span>
					{ stakeholder.email }
				</span>
			</div>
			<div className="faint">RFP Owner</div>
			{ currentUserId !== stakeholder.id && (
				<div>
					<DeleteButton type="icon" />
				</div>
			)}
		</div>
	</div>
);

StakeholderItem.propTypes = {
  stakeholder: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
};

StakeholderItem.defaultProps = {
  currentUserId: null,
};

const mapStateToProps = (state) => ({
  currentUserId: state.user.currentUser.id,
});

export default connect(mapStateToProps, null)(StakeholderItem);
