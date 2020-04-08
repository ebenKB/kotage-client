/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import { getRfpOutbox } from '../../redux/actions/rfpActions';

const MessageOutbox = ({
  messages, getSentMessages, isLoading,
}) => {
  useEffect(() => {
    if (!messages && !isLoading) {
      getSentMessages();
    }
  }, [isLoading]);
  return (
	<div>
		{messages && messages.map((m) => (
			<MessageItem
				key={m.id}
				message={m}
			/>
		))}
		<p className="kt-primary m-t-40">View 9 more sent messages</p>
	</div>
  );
};

MessageOutbox.propTypes = {
  messages: PropTypes.object.isRequired,
  getSentMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  getSentMessages: getRfpOutbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  messages: state.rfp.rfpOutbox,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageOutbox);
