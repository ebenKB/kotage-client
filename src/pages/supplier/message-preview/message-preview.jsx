/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import MessagePreviewComponent from '../../../components/message-preview/message-preview';
import { findSupplierRfpMessageByID } from '../../../redux/actions/supplierRfpActions';

const MessagePreview = ({ message, currentRfpID, findRfpMessage }) => (
	<MessagePreviewComponent
		message={message}
		currentRfpID={currentRfpID}
		findRfpMessage={findRfpMessage}
	/>
);

const mapStateToProps = (state) => ({
  message: state.supplierRfp.currentMessage,
  currentRfpID: state.supplierRfp.currentProposal.id,
});

const mapDispatchToProps = {
  findRfpMessage: findSupplierRfpMessageByID,
};

MessagePreview.propTypes = {
  message: PropTypes.object.isRequired,
  currentRfpID: PropTypes.number.isRequired,
  findRfpMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePreview);
