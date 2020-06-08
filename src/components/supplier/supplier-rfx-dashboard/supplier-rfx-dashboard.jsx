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
import { ReactComponent as Bullet } from '../../../svg/menu.svg';

const SupplierRfxDashboard = () => {
  const [deadline] = useState(new Date('July 17, 2020 03:24:00'));
  const [rsvpdeadline] = useState(new Date('July 01, 2020'));
  const [details] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptate error illum in quidem adipisci explicabo delectus hic nulla sint aspernatur non voluptatem, facere quae iure recusandae placeat eos repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptate error illum in quidem adipisci explicabo delectus hic nulla sint aspernatur non voluptatem, facere quae iure recusandae placeat eos repellendus.');

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
			<Link to="/supplier/rfx/:id/message">
				<Button
					icon={<MessageIcon className="m-r-4" />}
					small
					content="Message center"
					className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
				/>
			</Link>
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
				<KtDetailsCaption description={details} classes="p-all-20" />
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Requested Documents" />
			<div className="m-t-20">
				<p>Show the documents that have been requested here</p>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Rfp Questions" />
			<div className="flex-center m-t-20">
				<Bullet className="small logo m-r-5" />
				<p>Lorem cumque maxime eligendi magni eaque dignissimos deleniti? Repellendu? </p>
			</div>
			<div className="flex-center m-t-20">
				<Bullet className="small logo m-r-5" />
				<p>Lorem cumque maxime eligendi magni eaque dignissimos deleniti? Repellendu? </p>
			</div>
			<div className="flex-center m-t-20">
				<Bullet className="small logo m-r-5" />
				<p>Lorem cumque maxime eligendi magni eaque dignissimos deleniti? Repellendu? </p>
			</div>
		</KtWrapperLite>
		<KtWrapperLite
			classes="m-t-20"
		>
			<Divider type="thick" title="Rfp Attachments" />
			<div className="m-t-20">
				<p>Show all attachments here and allow users to preview or download them</p>
			</div>
		</KtWrapperLite>
		<div className="m-t-20 flex-center">
			<Link to="/supplier/rfx">
				<Button
					small
					default
					content="Go Back"
					className="tiny"
				/>
			</Link>
			<Link to="/supplierrfx/:id/response">
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
