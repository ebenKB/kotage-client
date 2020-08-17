import React from 'react';
import MessageCenterComponent from '../../../components/message-center/message-center';
import SupplierMessageInbox from '../message-inbox/message-inbox';
import SupplierMessageOutbox from '../message-outbox/message-outbox';

const MessageCenter = () => (
	<MessageCenterComponent
		MessageInbox={() => <SupplierMessageInbox />}
		MessageOutbox={() => <SupplierMessageOutbox />}
	/>
);

export default MessageCenter;
