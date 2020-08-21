/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import MessageOutboxComponent from '../../../components/message-outbox/message-outbox';
import { getSupplierSentMessages } from '../../../redux/actions/supplierRfpActions';

const MessageOutbox = ({ messages, meta, getSentMessages }) => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!messages && !hasFetched) {
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
  getSentMessages: getSupplierSentMessages,
};

MessageOutbox.propTypes = {
  messages: PropTypes.array,
  getSentMessages: PropTypes.func.isRequired,
  meta: PropTypes.object,
};

MessageOutbox.defaultProps = {
  messages: null,
  meta: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageOutbox);
