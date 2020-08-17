/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getSupplierRfpMessageInbox } from '../../../redux/actions/supplierRfpActions';
import MessageInboxComponent from '../../../components/message-inbox/message-inbox';

const MessageInbox = ({ messages, getMessageInbox }) => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!messages) {
      getMessageInbox();
      setHasFetched(true);
    }
  });

  return (
	<MessageInboxComponent
		messages={messages}
		hasFetched={hasFetched}
	/>
  );
};

const mapDispatchToProps = {
  getMessageInbox: getSupplierRfpMessageInbox,
};

const mapStateToProps = (state) => ({
  messages: state.supplierRfp.rfpInbox,
});


MessageInbox.propTypes = {
  getMessageInbox: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInbox);
