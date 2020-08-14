/* eslint-disable import/order */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRfpOutbox } from '../../../redux/actions/rfpActions';
import { PropTypes } from 'prop-types';
import MessageOutboxComponent from '../../../components/message-outbox/message-outbox';

const MessageOutbox = ({
  isLoading, messages, meta, getSentMessages,
}) => {
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasFetched) {
      getSentMessages(id);
      setHasFetched(true);
    }
  }, [isLoading]);

  return (
	<MessageOutboxComponent
		meta={meta}
		messages={messages}
		isLoading={isLoading}
	/>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  messages: state.rfp.rfpOutbox,
  meta: state.rfp.rfpOutboxMeta,
});

const mapDispatchToProps = {
  getSentMessages: getRfpOutbox,
};

MessageOutbox.propTypes = {
  getSentMessages: PropTypes.func.isRequired,
  meta: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageOutbox);
