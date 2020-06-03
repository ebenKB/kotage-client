import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import {
  format,
} from 'date-fns';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MessageIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import Divider from '../../kt-divider/divider';
import RfpTitle from '../../snippets/rfp-title/rfp-title';
import KtDetailsCaption from '../../kt-details-caption/kt-details-caption';

const SupplierRfxDashboard = () => {
  const [deadline] = useState(new Date('July 17, 2020 03:24:00'));
  const [rsvpdeadline] = useState(new Date('July 01, 2020'));

  return (
	<MainContent
		help={Help}
	>
		Write the tile here
		<RfpTitle classes="m-t-20" />
		<div className="flex-center">
			<div className="m-r-15">
				<Button
					icon={<BookmarkBorderIcon className="kt-primary logo" />}
					small
					content="Acknowledge participation"
					className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
				/>
			</div>
			<div className="m-r-15">
				<Button
					icon={<BookmarkBorderIcon className="kt-primary logo" />}
					small
					content="Accept Terms and Conditions"
					className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
				/>
			</div>
			<Button
				icon={<MessageIcon className="m-r-4" />}
				small
				content="Message center"
				className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
			/>
		</div>
		<Divider classes="p-b-4" type="faint" />
		<div className="m-t-20 text-rights flex-center">
			<AccessTimeIcon className="m-r-5 kt-primary" />
			Bid is due on
			{' '}
			{format(deadline, 'iiii do LLLL, yyyy')}
			{' '}
			at
			{' '}
			{format(deadline, 'h:m:ss aaaa')}
		</div>
		<KtWrapperLite
			classes="m-t-20"
		>
			<div className="">
				<p>
					All RSVP should be acknowledged on or before
					<span className="kt-primary m-l-5">{format(rsvpdeadline, 'iiii do LLLL, yyyy')}</span>
				</p>
				<p>
					All Questions should submitted on or before
					<span className="kt-primary m-l-5">
						{format(rsvpdeadline, 'iiii do LLLL, yyyy')}
					</span>
				</p>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Description" />
			<div className="m-t-20">
				<KtDetailsCaption description="Some description here" classes="p-all-20" />
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
		<div className="m-t-20 flex-center">
			<Link to="/supplier/events">
				<Button
					small
					default
					content="Go Back"
					className="tiny"
				/>
			</Link>
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
};

export default SupplierRfxDashboard;
