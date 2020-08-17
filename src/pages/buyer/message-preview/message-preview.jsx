/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { findRfpMessageById } from '../../../redux/actions/rfpActions';
import MessagePreviewComponent from '../../../components/message-preview/message-preview';

const MessagePreview = ({ message, currentRfpID, findRfpMessage }) => (
	<MessagePreviewComponent
		message={message}
		currentRfpID={currentRfpID}
		findRfpMessage={findRfpMessage}
	/>
);

MessagePreview.propTypes = {
  message: PropTypes.object.isRequired,
  currentRfpID: PropTypes.number.isRequired,
  findRfpMessage: PropTypes.func.isRequired,
};

// export default MessagePreview;
// const mapDispatchToProps = {
//   findRfpMessage: findRfpMessageById,
//   setMessageBlob: setCurrenMessageBlob,
// };

// const mapStateToProps = (state) => ({
//   message: state.rfp.currentOutbox,
//   tenant_id: state.user.currentUser.tenant_id,
//   currentRfpID: state.rfp.currentProposal.id,
// });

const mapStateToProps = (state) => ({
  message: state.rfp.currentOutbox,
  currentRfpID: state.rfp.currentProposal.id,
});

const mapDispatchToProps = {
  findRfpMessage: findRfpMessageById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);
