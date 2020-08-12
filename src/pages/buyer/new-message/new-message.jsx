/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CreateMessage from '../../../components/message-center/new-message/new-message';
import { createRfpMessage } from '../../../redux/actions/rfpActions';
import { setNotification } from '../../../redux/actions/appActions';

const NewMessage = ({
  isLoading,
  currentProposal,
  createNewMessage,
  currentProposalId,
}) => (
	<CreateMessage
		createNewMessage={createNewMessage}
		isLoading={isLoading}
		currentProposal={currentProposal}
		currentProposalId={currentProposalId}
	/>
);


const mapDispatchToProps = {
  createNewMessage: createRfpMessage,
  showNotification: setNotification,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  currentProposal: state.rfp.currentProposal,
  currentProposalId: state.rfp.currentProposal.id,
  tenantUid: state.tenant.currentTenant.account_id,
  accountType: state.app.accountType,
  currentUser: state.user.currentUser,
});

NewMessage.propTypes = {
  createNewMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentProposal: PropTypes.object.isRequired,
  currentProposalId: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
