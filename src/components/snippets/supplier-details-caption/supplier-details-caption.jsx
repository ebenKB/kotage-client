/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'semantic-ui-react';
import ButtonGroup from '../../form-fields/button-group/button-group';
import PopupDropdown from '../popup/popup';

const SupplierDetailsCaption = ({ type }) => (
	<div>
		{type === 'active' && (
			<div className="rfp-suppliers__item m-b-10 m-t-10 active">
				<div className="bold">APOTICA COMPANY LIMITED</div>
				<div>Submitted on 24/04/2020</div>
				<div className="text-right">
					<ButtonGroup>
						<Button content="View Bid" />
						<Button
							positive
							content={(
								<PopupDropdown
									trigger="Bid Action"
									position="top center"
								>
									<div className="flex-center">
										<Button basic content="Decline" />
										<Button basic positive content="Accept" success />
									</div>
								</PopupDropdown>
							)}
						/>

					</ButtonGroup>
				</div>
			</div>
		)}
		{type === 'pending' && (
			<div className="rfp-suppliers__item m-b-10 m-t-10">
				<div className="bold">MTN GHANA LIMITED</div>
				<div>Not submitted</div>
			</div>
		)}
	</div>
);

export default SupplierDetailsCaption;
