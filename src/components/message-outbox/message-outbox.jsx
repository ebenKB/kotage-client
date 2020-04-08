/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import { getRfpOutbox } from '../../redux/actions/rfpActions';
import { getPageRemainder } from '../../utils/app/index';

const MessageOutbox = ({
  messages, getSentMessages, isLoading, meta,
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (!messages && !isLoading) {
      getSentMessages(id);
    }
  }, [isLoading]);
  return (
	<div>
		<div className="message-center__heading m-b-20">
			<h4>Messages sent to suppliers</h4>
		</div>
		{messages && messages.map((m) => (
			<MessageItem
				key={m.id}
				message={m}
			/>
		))}
		{meta && (
			<div className="m-t-20 m-b-20">
				<Button className="kt-transparent kt-primary">
          View&nbsp;
					{getPageRemainder(meta.count, meta.items, meta.page)}
          &nbsp;
          more sent messages
				</Button>
			</div>
		)}
	</div>
  );
};

MessageOutbox.propTypes = {
  messages: PropTypes.object.isRequired,
  getSentMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  getSentMessages: getRfpOutbox,
};

const mapStateToProps = (state) => ({
  isLoading: state.rfp.loading,
  messages: state.rfp.rfpOutbox,
  meta: state.rfp.rfpOutboxMeta,
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageOutbox);
