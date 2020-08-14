/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router';
import { getRfpInbox } from '../../../redux/actions/rfpActions';
import MessageInboxComponent from '../../../components/message-inbox/message-inbox';

const MessageInbox = ({ messages, getMessageInbox, isLoading }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!messages && !hasFetched && !isLoading) {
      getMessageInbox(id);
      setHasFetched(true);
    }
  });
  return (
	<div>
		<MessageInboxComponent
			messages={messages}
			isLoading={isLoading}
			hasFetched={hasFetched}
		/>
	</div>
  );
};

const mapDispatchToProps = {
  getMessageInbox: getRfpInbox,
};

const mapStateToProps = (state) => ({
  messages: state.rfp.rfpInbox,
  isLoading: state.rfp.loading,
});

MessageInbox.propTypes = {
  messages: PropTypes.array.isRequired,
  getMessageInbox: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInbox);
