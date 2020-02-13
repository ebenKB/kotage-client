import React from 'react';
import './user-details.scss';
import { Label } from 'semantic-ui-react';

const UserDetails = () => (
	<div className="user-details__wrapper">
		<div>
			<Label circular color="grey" size="big">
        AB
			</Label>
		</div>
		<div>
			<h1>Dorcas Dashie</h1>
			<div>blendy031@gmail.com</div>
			<div>dropbox@28323.apotica.net</div>
		</div>
		<div>three</div>
	</div>
);

export default UserDetails;
