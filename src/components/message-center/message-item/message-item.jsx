/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Divider from '../../kt-divider/divider';
import { ReactComponent as MenuIcon } from '../../../svg/menu.svg';
import { trimContent } from '../../../utils/app/index';

const MessageItem = ({ message, type }) => {
  const history = useHistory();
  const { location } = history;
  return (
	<Link to={`${location.pathname}/${type}/${message.id}`}>
		<div className="message-item m-t-10">
			<div>
				<MenuIcon className="very small logo" />
			</div>
			<p align="justify">{trimContent(message.message)}</p>
			<div className="text-right">
				02/22/2020
				{message.date}
			</div>
		</div>
		<Divider type="faint" />
	</Link>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default MessageItem;
