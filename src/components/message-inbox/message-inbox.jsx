/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import { getRfpInbox } from '../../redux/actions/rfpActions';
import KtLoader from '../loader/loader';

const MessageInbox = ({
  messages, getMessageInbox, isLoading,
}) => {
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (!messages && !hasFetched && !isLoading) {
      getMessageInbox();
      setHasFetched(true);
    }
  });
  return (
	<div>
		{isLoading && (
			<div className="m-t-40">
				<KtLoader />
			</div>
		)}
		{!messages && !isLoading && hasFetched && (
			<h3>Your inbox is empty</h3>
		)}
		{messages && messages.map((m) => (
			<MessageItem
				key={m.id}
				message={m}
			/>
		))}
		{messages && (
			<p className="kt-primary m-t-40">View 9 more sent messages</p>
		)}
	</div>
  );
};

MessageInbox.propTypes = {
  messages: PropTypes.object.isRequired,
  getMessageInbox: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  getMessageInbox: getRfpInbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  messages: state.rfp.rfpInbox,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInbox);
