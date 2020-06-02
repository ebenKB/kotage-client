import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import Divider from '../../kt-divider/divider';

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
		<Divider classes="p-b-4" type="faint" />
		<div className="m-t-20 text-rights kt-primary">
			This Bid is due in 17:40:33
		</div>
		<KtWrapperLite
			classes="m-t-20"
		>
			<div className="">
				<p>RSVP Deadline:</p>
				<p>Question Deadline</p>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Description" />
			<div className="m-t-20">
				<p>lorem: Write all the descriptions of the bid here </p>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Rfp Questions" />
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Rfp Attachments" />
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
