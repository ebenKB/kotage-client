/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MessageItem from '../message-center/message-item/message-item';
import { getRfpOutbox } from '../../redux/actions/rfpActions';
import { getPageRemainder } from '../../utils/app/index';
import { ReactComponent as File } from '../../svg/empty.svg';

const MessageOutbox = ({
  messages, getSentMessages, isLoading, meta,
}) => {
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasFetched) {
      getSentMessages(id);
      setHasFetched(true);
    }
  }, [isLoading]);

  const remainder = () => getPageRemainder(meta.count, messages.length, 10);

  return (
	<div>
		{messages && (
			<div className="message-center__heading m-b-20">
				<h4>Messages sent to suppliers</h4>
			</div>
		)}
		{messages && messages.map((m) => (
			<div>
				<MessageItem
					key={m.id}
					message={m}
				/>
			</div>
		))}

		{!messages && !isLoading && hasFetched && (
			<div className="text-center">
				<File className="medium dark logo" />
				<p>You have not sent any messages to your supplers.</p>
			</div>
		)}

		{meta && messages && (remainder() > 0) && (
			<div className="m-t-20 m-b-20">
				<Button className="kt-transparent kt-primary">
					View&nbsp;
					{remainder()}
					&nbsp;
					more sent messages
				</Button>
			</div>
		)}
	</div>
  );
};

MessageOutbox.propTypes = {
  messages: PropTypes.object,
  getSentMessages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  meta: PropTypes.object,
};

MessageOutbox.defaultProps = {
  meta: null,
  messages: null,
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
