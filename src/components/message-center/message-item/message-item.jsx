/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import Divider from '../../kt-divider/divider';
import { ReactComponent as MenuIcon } from '../../../svg/menu.svg';

const MessageItem = ({ message, handleAction }) => (
	<Button className="message-item__wrapper fluid text-left kt-transparent" onClick={() => handleAction(message)}>
		<div className="message-item m-t-10">
			<div>
				<MenuIcon className="very small logo" />
			</div>
			<p>{message.message}</p>
			<div className="text-right">{message.date}</div>
		</div>
		<Divider type="faint" />
	</Button>
);

MessageItem.propTypes = {
  handleAction: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
};

export default MessageItem;
