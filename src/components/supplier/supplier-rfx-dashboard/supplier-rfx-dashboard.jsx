import React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';

const SupplierRfxDashboard = () => (
	<MainContent
		help={Help}
	>
		<h3>Write the title of the Event here</h3>
		<div className="flex-center">
			<div className="m-r-15">
				<Button
					small
					content="Acknowledge participation"
					className="bold kt-sucess kt-transparent kt-primary tiny"
				/>
			</div>
			<Button
				small
				content="Accept Terms and Conditions"
				className="bold kt-sucess kt-transparent kt-primary tiny"
			/>
		</div>
		<Divider classes="p-b-4" />
		<KtWrapperLite
			classes="m-t-20"
		>
			<div className="">
				<p>show deatils of the bid here</p>
			</div>
		</KtWrapperLite>
		<div className="m-t-20">
			<Link to="/supplier/events/:id/response">
				<Button
					small
					content="Create Bid Response"
					className="kt-sucess green tiny"
				/>
			</Link>
		</div>
	</MainContent>
);

export default SupplierRfxDashboard;
