import React from 'react';
import './activity-item.scss';
import { Table, Button } from 'semantic-ui-react';

const ActivityItem = () => (
	<div className="activity-item">
		<div className="activity-item__wrapper">
			<Table striped compact="very">
				<Table.Body>
					<Table.Row>
						<Table.Cell>MTN Ghana has invited you to a new proposal.</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>MTN Ghana has invited you to a new proposal.</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Your bid to MTN Ghana has been accpeted.</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Your bid to Tigo Ghana has been rejected.</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>ASA savings and Loans has invited you to a proposal.</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>MTN Ghana has invited you to a new proposal.</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</div>
		<div className="m-t-20 kt-primary">
			<Button
				content="See more recent activities"
				className="kt-transparent kt-primary"
			/>
		</div>
	</div>
);

export default ActivityItem;
