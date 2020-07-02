import React from 'react';
import { Table } from 'semantic-ui-react';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import MainContent from '../../kt-main-content/mainContent';

const SupplierNotification = () => (
	<MainContent
		classes="m-t-20"
	>
		<KtWrapper
			header="Notifications"
		>
			<Table striped>
				<Table.Body>
					<Table.Row>
						<Table.Cell>MTN Ghana has invited you to a new proposal</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Tigo Ghana Limited has rejected your bid</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>MTN Ghana has accepted your bid</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>MTN Ghana sent you a new message</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>ASA Savings and Loans has invited you to a new proposal</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		</KtWrapper>
	</MainContent>
);

export default SupplierNotification;
