import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import Divider from '../../kt-divider/divider';
import { ReactComponent as MenuIcon } from '../../../svg/menu.svg';

const MessageItem = ({ handleClick }) => (
	<Button className="message-item__wrapper fluid text-left kt-transparent" onClick={() => handleClick}>
		<div className="message-item m-t-20">
			<div>
				<span className="m-r-10">
					<MenuIcon className="very small logo" />
				</span>
				<span>I have a question about this request for proposal</span>
			</div>
			<div className="text-right">02/21/2020</div>
		</div>
		<Divider type="faint" classes="p-b-8" />
	</Button>
);

MessageItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default MessageItem;
