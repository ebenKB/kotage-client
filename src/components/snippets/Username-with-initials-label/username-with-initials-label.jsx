/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Label } from 'semantic-ui-react';
import { getInitialNames } from '../../../utils/app';
import './username-initials-lable.scss';

const UsernameWithInitialsLabel = ({ user }) => (
	<div className="username-lable">
		<Label circular color="grey" size="big">
			{getInitialNames(`${user.firstname} ${user.lastname}`)}
		</Label>
	</div>
);

UsernameWithInitialsLabel.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UsernameWithInitialsLabel;
