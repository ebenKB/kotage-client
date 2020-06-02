import React, { useState } from 'react';
import { Divider } from 'semantic-ui-react';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import SupplierRfxItem from '../supplier-rfx-item/supplier-rfx-item';

const supplier = () => {
  const [proposals] = useState([
    {
      id: 1,
      title: 'Request for Routes and Switches',
    },
    {
      id: 2,
      title: 'Request for Routes and Switches',
    },
    {
      id: 3,
      title: 'Request for Routes and Switches',
    },
  ]);
  return (
	<MainContent
		help={Help}
	>
		<KtWrapper
			header="Active Events"
		>
			<div>
				<h3>show all active events here</h3>
				<Divider type="faint" />
				{proposals.map((p) => (
					<>
						<SupplierRfxItem
							proposal={p}
							type="RfP"
						/>
						<Divider type="faint" />
					</>
				))}
			</div>
		</KtWrapper>
	</MainContent>
  );
};

export default supplier;
