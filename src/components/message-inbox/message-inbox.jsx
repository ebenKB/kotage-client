/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import KtLoader from '../loader/loader';
import { ReactComponent as File } from '../../svg/empty.svg';

const MessageInbox = ({
  messages, isLoading, hasFetched,
}) => (
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
			<Fragment key={m.id}>
				<div className="message-center__heading m-b-20">
					<h4>Messages received from suppliers</h4>
				</div>
				<MessageItem
					key={m.id}
					message={m}
					type="inbox"
				/>
			</Fragment>
		))}
		{messages && (
			<p className="kt-primary m-t-40">View 9 more sent messages</p>
		)}
	</div>
);

MessageInbox.propTypes = {
  messages: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasFetched: PropTypes.bool.isRequired,
};

MessageInbox.defaultProps = {
  messages: null,
};

// const mapDispatchToProps = {
//   getMessageInbox: getRfpInbox,
//   getSupplierInbox: getSupplierRfpMessageInbox,
// };

// const mapStateToProps = (state) => ({
//   isLoading: state.rfp.loading,
//   messages: state.rfp.rfpInbox,
//   accountType: state.app.accountType,
// });

export default MessageInbox;
