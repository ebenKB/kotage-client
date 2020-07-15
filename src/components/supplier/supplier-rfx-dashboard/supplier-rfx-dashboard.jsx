/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Button, Table, Form, Radio,
} from 'semantic-ui-react';
import {
  format, formatDistance,
} from 'date-fns';
import { Link, useParams, useHistory } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MessageIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import EmptyContentWrapper from '../../empty-content-wrapper/empty-content-wrapper';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import Divider from '../../kt-divider/divider';
import RfpTitle from '../supplier-rfp-title/rfp-title';
import KtDetailsCaption from '../../kt-details-caption/kt-details-caption';
import { ReactComponent as Bullet } from '../../../svg/menu.svg';
import {
  findSupplierEventByID, getSupplierRfpByID, confirmRSVP,
} from '../../../redux/actions/supplierRfpActions';
import ParseHtml from '../../snippets/parse-html/parse-html';
import FileHandler from '../../file-handler/file-handler';
import PopupDropdown from '../../snippets/popup/popup';
import { setNotification } from '../../../redux/actions/appActions';

const SupplierRfxDashboard = ({
  loading,
  currentTenant,
  respondToRSVP,
  currentProposal,
  findSupplierRfp,
  refreshSupplierRfp,
  // checkSupplierStatus,
}) => {
  const params = useParams();
  const history = useHistory();
  const [hasInit, setInit] = useState(false);
  const [willParticipate, setParticipation] = useState(null);

  const findSupplierRfpByID = async () => {
    const proposal = await findSupplierRfp(params.id, params.tenant_id);
    setParticipation(proposal.hasConfirmedRSVP);
  };

  const refresh = async () => {
    try {
      await refreshSupplierRfp(params.id, params.tenant.id);
      // await checkSupplierStatus();
    } catch (error) {
      if (error.response) {
        const { response: { data: { invalid_token } } } = error;
        if (invalid_token) {
          history.push('/auth/signin');
        } else {
          setNotification(error, 'error');
        }
      }
    }
  };

  useEffect(() => {
    if (!hasInit) {
      findSupplierRfpByID();
      refresh();
      setInit(true);
    } else {
      setParticipation(currentProposal.hasConfirmedRSVP);
    }
  }, [params, currentProposal]);

  const canRSVP = () => {
    const today = new Date();
    const date = new Date(2020, 5, 16);
    if (date - today > 0) {
      return true;
    }
    return false;
  };

  const confirmParticipation = () => {
    if (canRSVP && willParticipate !== currentProposal.hasConfirmedRSVP) {
      respondToRSVP(willParticipate);
    }
  };

  const revertChange = () => {
    setParticipation(currentProposal.hasConfirmedRSVP);
  };

  return (
	<MainContent
		help={Help}
	>
		{currentProposal && (
			<>
				<RfpTitle classes="m-t-20" />
				<div className="flex-center">
					<div className="m-r-15">
						<PopupDropdown
							position="bottom center"
							classes="popup-wrapper"
							trigger={(
								<Button
									icon={<BookmarkBorderIcon className="kt-primary logo" />}
									small
									content="Acknowledge participation"
									className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
								/>
							)}
						>
							<p className="bold m-t-10 popup-header">Will you participate in this bid?</p>
							<div className="m-t-0 popup-body">
								<div className="p-l-20">
									<Form>
										<Form.Field>
											<Radio
												label="Yes"
												name="radioGroup"
												value="yes"
												checked={willParticipate}
												onChange={() => setParticipation(!willParticipate)}
											/>
										</Form.Field>
										<Form.Field>
											<Radio
												label="No"
												name="radioGroup"
												value="no"
												checked={!willParticipate}
												onChange={() => setParticipation(!willParticipate)}
											/>
										</Form.Field>
									</Form>
								</div>
							</div>
							<div className="m-t-20 flex-center">
								<Button
									basic
									size="tiny"
									fluid
									content="Cancel"
									disabled={currentProposal.hasConfirmedRSVP === willParticipate}
									onClick={revertChange}
								/>
								<Button
									loading={loading}
									size="tiny"
									fluid
									positive
									content="Send"
									disabled={currentProposal.hasResponded}
									onClick={confirmParticipation}
								/>
							</div>
						</PopupDropdown>
					</div>
					{/* <div className="m-r-15">
						<Link to={`/supplier/rfp/${currentProposal.id}/terms-and-conditions`}>
							<Button
								icon={<BookmarkBorderIcon className="kt-primary logo" />}
								small
								content="Accept Terms and Conditions"
								className="kt-sucess kt-transparent kt-primary tiny flex flex-center"
								disabled={currentProposal.hasAcceptedTerms}
							/>
						</Link>
					</div> */}
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
          &nbsp;
					<span>(</span>
					<span>{formatDistance(new Date(currentProposal.bid_deadline), new Date())}</span>
					<span>)</span>
				</div>
				<KtWrapperLite
					classes="m-t-20"
				>
					<div className="">
						<p>
							RSVP Deadline:
							<span className="kt-primary m-l-5">
								{format(new Date(currentProposal.rsvp_deadline), 'iiii do LLLL, yyyy  hh:mm:ss aaaa')}
							</span>
						</p>
						<p>
							Questions Deadline:
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
								<p>{q.question}</p>
							</div>
						))}
						{currentProposal.questions.length === 0 && (
							<div className="m-t-20">
								<EmptyContentWrapper message="No questions available" />
							</div>
						)}
					</KtWrapperLite>
				)}
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider type="thick" title="Rfp Attachments" />
					<div className="m-t-20">
						{currentProposal.files && (
							<FileHandler
								details={<RfpTitle />}
								files={currentProposal.files}
								tenantID={currentTenant.id}
								objectOwnerID={currentProposal.id}
								shouldSignUrl
							/>
						)}
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
					{!currentProposal.hasResponded && (
						<Link to={`/supplier/rfp/${currentProposal.id}/terms-and-conditions`}>
							<Button
								small
								content="Create Bid Response"
								className="kt-sucess green tiny"
							/>
						</Link>
					)}
				</div>
			</>
		)}
	</MainContent>
  );
};

SupplierRfxDashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
  findSupplierRfp: PropTypes.func.isRequired,
  currentTenant: PropTypes.object.isRequired,
  refreshSupplierRfp: PropTypes.func.isRequired,
  currentProposal: PropTypes.object.isRequired,
  respondToRSVP: PropTypes.func.isRequired,
  // checkSupplierStatus: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  findSupplierRfp: findSupplierEventByID,
  refreshSupplierRfp: getSupplierRfpByID,
  respondToRSVP: confirmRSVP,
  // checkSupplierStatus: checkSupplierRfpClaims,
};

const mapStateToProps = (state) => ({
  loading: state.supplierRfp.loading,
  currentTenant: state.tenant.currentTenant,
  currentProposal: state.supplierRfp.currentProposal,
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplierRfxDashboard);
