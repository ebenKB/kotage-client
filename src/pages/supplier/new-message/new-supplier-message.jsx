/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CreateMessage from '../../../components/message-center/new-message/new-message';
import { setNotification } from '../../../redux/actions/appActions';
import { createSupplierRfpMessage } from '../../../redux/actions/supplierRfpActions';

const NewMessage = ({
  isLoading,
  currentProposal,
  createNewMessage,
}) => (
	<CreateMessage
		createNewMessage={createNewMessage}
		isLoading={isLoading}
		currentProposal={currentProposal}
		currentProposalId={currentProposal && currentProposal.id}
	/>
);

const mapDispatchToProps = {
  createNewMessage: createSupplierRfpMessage,
  showNotification: setNotification,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  currentProposal: state.supplierRfp.currentProposal,
  tenantUid: state.tenant.currentTenant.account_id,
  accountType: state.app.accountType,
  currentUser: state.user.currentUser,
});

NewMessage.propTypes = {
  createNewMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentProposal: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
