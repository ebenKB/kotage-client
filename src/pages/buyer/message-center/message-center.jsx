import React from 'react';
import MessageCenterComponent from '../../../components/message-center/message-center';
import BuyerMessageInbox from '../message-inbox/message-inbox';
import MessageOutbox from '../message-outbox/message-outbox';

const MessageCenter = () => (
	<MessageCenterComponent
		MessageInbox={() => <BuyerMessageInbox />}
		MessageOutbox={() => <MessageOutbox />}
	/>
);

export default MessageCenter;
