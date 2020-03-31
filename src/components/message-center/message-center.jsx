import React from 'react';
import { Tab } from 'semantic-ui-react';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import AddItem from '../snippets/add-item/add-item';

const MessageCenter = () => {
  const panes = [
    { menuItem: 'Inbox', render: () => <Tab.Pane>Show all inbox message here</Tab.Pane> },
    { menuItem: 'Sent Messages', render: () => <Tab.Pane>Show all sent messages here</Tab.Pane> },
  ];
  return (
	<MainContent
		help={Help}
	>
		<KtWrapperLite>
			<div className="m-b-20">
				<AddItem
					title="Compose Message"
				/>
			</div>
			<Tab panes={panes} />
		</KtWrapperLite>
	</MainContent>
  );
};

export default MessageCenter;
