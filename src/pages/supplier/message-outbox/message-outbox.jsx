/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import MessageOutboxComponent from '../../../components/message-outbox/message-outbox';
import { getSupplierSendMessages } from '../../../redux/actions/supplierRfpActions';

const MessageOutbox = ({ messages, getSentMessages, meta }) => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (messages && !hasFetched) {
      getSentMessages();
      setHasFetched(true);
    }
  }, []);

  return (
	<MessageOutboxComponent
		meta={meta}
		messages={messages}
		isLoading
	/>
  );
};
const mapStateToProps = (state) => ({
  messages: state.supplierRfp.rfpOutbox,
});

const mapDispatchToProps = {
  getSentMessages: getSupplierSendMessages,
};

MessageOutbox.propTypes = {
  messages: PropTypes.object.isRequired,
  getSentMessages: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageOutbox);
