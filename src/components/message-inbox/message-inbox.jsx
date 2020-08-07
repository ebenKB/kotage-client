/* eslint-disable react/jsx-fragments */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import { getRfpInbox } from '../../redux/actions/rfpActions';
import KtLoader from '../loader/loader';
import { ReactComponent as File } from '../../svg/empty.svg';

const MessageInbox = ({
  messages, getMessageInbox, isLoading,
}) => {
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
		{isLoading && (
			<div className="m-t-40">
				<KtLoader />
			</div>
		)}
		{!messages && !isLoading && hasFetched && (
			<div className="text-center">
				<File className="medium dark logo" />
				<p>You don&apos;t have any message from your supplers.</p>
			</div>
		)}
		{messages && messages.map((m) => (
			<Fragment>
				<div className="message-center__heading m-b-20">
					<h4>Messages received from suppliers</h4>
				</div>
				<MessageItem
					key={m.id}
					message={m}
				/>
			</Fragment>
		))}
		{messages && (
			<p className="kt-primary m-t-40">View 9 more sent messages</p>
		)}
	</div>
  );
};

MessageInbox.propTypes = {
  messages: PropTypes.object,
  getMessageInbox: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

MessageInbox.defaultProps = {
  messages: null,
};

const mapDispatchToProps = {
  getMessageInbox: getRfpInbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  messages: state.rfp.rfpInbox,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInbox);
