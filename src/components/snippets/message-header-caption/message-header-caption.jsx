/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import UsernameWithInitialsLabel from '../Username-with-initials-label/username-with-initials-label';


const MessageHeaderCaption = ({ user = null }) => (
	<div>
		<h3 className="dark">Message subject is here</h3>
		<div className="flex">
			{user && (<UsernameWithInitialsLabel user={user} />)}
			<div className="sm-caption m-b-20 m-l-8">
				<div className="kt-primary">
					{user && (
						<span>
							{user.firstname}
							{' '}
							{user.lastname}
						</span>
					)}
				</div>
				<span className="xsm-caption">Monday 22nd March 2020</span>
				{/* <div>4 suppliers received this message</div> */}
			</div>
		</div>
	</div>
);

MessageHeaderCaption.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MessageHeaderCaption;
