/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import {
  format,
} from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MessageIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import Divider from '../../kt-divider/divider';
import RfpTitle from '../supplier-rfp-title/rfp-title';
import KtDetailsCaption from '../../kt-details-caption/kt-details-caption';
import { ReactComponent as Bullet } from '../../../svg/menu.svg';
import { findSupplierEventByID } from '../../../redux/actions/supplierRfpActions';
import ParseHtml from '../../snippets/parse-html/parse-html';
import FileHandler from '../../file-handler/file-handler';

const SupplierRfxDashboard = ({ findSupplierRfp }) => {
  const params = useParams();
  const [currentProposal, setCurrentProposal] = useState(null);

  useEffect(() => {
    findSupplierRfp(params.id)
      .then((proposal) => setCurrentProposal(proposal));
  }, [params]);

  return (
	<MainContent
		help={Help}
	>
		{currentProposal && (
			<>
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
					{format(new Date(currentProposal.bid_deadline_date), 'iiii do LLLL, yyyy')}
					{' '}
					at
					{' '}
					{format(new Date(currentProposal.bid_deadline), 'h:m:ss aaaa')}
				</div>
				<KtWrapperLite
					classes="m-t-20"
				>
					<div className="">
						<p>
							All RSVP should be acknowledged on or before
							<span className="kt-primary m-l-5">
								{format(new Date(currentProposal.rsvp_deadline), 'iiii do LLLL, yyyy  hh:mm:ss aaaa')}
							</span>
						</p>
						<p>
							All Questions should submitted on or before
							<span className="kt-primary m-l-5">
								{format(new Date(currentProposal.question_deadline), 'iiii do LLLL, yyyy hh:mm:ss aaaa')}
							</span>
						</p>
					</div>
				</KtWrapperLite>
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider type="thick" title="Description" />
					<div className="m-t-20">
						<KtDetailsCaption description={<ParseHtml content={currentProposal.description} />} classes="p-all-20" />
					</div>
				</KtWrapperLite>
				{currentProposal.documents && (
					<KtWrapperLite
						classes="m-t-20"
					>
						<Divider type="thick" title="Requested Documents" />
						<div className="m-t-20">
							<Table celled striped>
								<Table.Header>
									<Table.Row>
										<Table.HeaderCell colSpan="3">
											{currentProposal.documents.length}
											{' '}
											Rfp Document(s)
										</Table.HeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									{currentProposal.documents.map((d) => (
										<Table.Row>
											<Table.Cell collapsing>
												{d.name}
											</Table.Cell>
											<Table.Cell>
												{d.description}
											</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</div>
					</KtWrapperLite>
				)}
				{currentProposal.questions && (
					<KtWrapperLite
						classes="m-t-20"
					>
						<Divider type="thick" title="Rfp Questions" />
						{currentProposal.questions.map((q) => (
							<div className="flex-center m-t-20">
								<Bullet className="small logo m-r-5" />
								<p>{q}</p>
							</div>
						))}
						{currentProposal.questions.length === 0 && (
							<p>no questions found</p>
						)}
					</KtWrapperLite>
				)}
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider type="thick" title="Rfp Attachments" />
					<div className="m-t-20">
						<FileHandler files={currentProposal.files} />
					</div>
				</KtWrapperLite>
			</>
		)}
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

SupplierRfxDashboard.propTypes = {
  findSupplierRfp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  findSupplierRfp: findSupplierEventByID,
};

export default connect(null, mapDispatchToProps)(SupplierRfxDashboard);
