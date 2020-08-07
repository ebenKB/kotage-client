/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import AttachmentIcon from '@material-ui/icons/Attachment';
import { getCurrentProposal } from '../../../../redux/actions/rfpActions';
import Divider from '../../../kt-divider/divider';
import 'react-circular-progressbar/dist/styles.css';
import './show-rfp.scss';
import MainContent from '../../../kt-main-content/mainContent';
import Help from '../../../../utils/requisitions/new/help';
// import KtWrapperLite from '../../../kt-wrapper-lite/kt-wrapper-lite';
// import StakeholderGroup from '../../../stakeholder-group/stakeholder-group';
// import QuestionListGroup from '../../../question-list-group/question-list-group';
// import DocumentListGroup from '../../../document-list-group/document-list-group';
// import { ReactComponent as MessageIcon } from '../../../../svg/mail.svg';
// import AttachmentListGroup from '../../../attachment-list-group/attachment-list-group';
import KtWrapper from '../../../kt-wrapper/kt-wrapper';
import SupplierDirectorySection from '../../../supplier-directory-section/supplier-directory-section';
import QuestionListGroup from '../../../question-list-group/question-list-group';
import TimelineItem from '../../../timeline-item/timeline-item';
import StakeholderGroup from '../../../stakeholder-group/stakeholder-group';
import DocumentListGroup from '../../../document-list-group/document-list-group';
import RfpTitle from '../../../snippets/rfp-title/rfp-title';
import FileHandler from '../../../file-handler/file-handler';
import ParseHtml from '../../../snippets/parse-html/parse-html';

const ShowRfp = ({
  match, getProposal, proposal, history, tenantID,
}) => {
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getProposal(id);
  }, [id]);

  const handleAction = () => {
    history.push(`/rfx/proposal/${id}/edit`);
  };
  return (
	<MainContent
		help={Help}
	>
		<RfpTitle classes="m-t-20 m-b-20" />
		<KtWrapper
			header=""
			canPerform
			isLite
			actionName="Edit Proposal"
			canFilter={false}
			canPublish={false}
			cancelUrl={`/rfx/proposal/dashboard/${id}`}
			handleAction={handleAction}
		>
			<div>
				{proposal && (
					<div>
						<Divider ishoverable type="faint" title="RFP DETAILS" classes="" isNumbered number="1" />
						<div className="m-t-20 m-b-20 kt-bg-shadow kt-text-caption__wrapper kt-move-left">
							<ParseHtml content={proposal.description} />
						</div>
						<div className="m-t-40">
							<Divider ishoverable type="faint" title="EVENT TIMELINE" classes="" isNumbered number="2" />
							<div className="kt-pad-left">
								<TimelineItem
									label="Bid Deadline:"
									dateValue="02/20/2020"
									timeValue={proposal.bid_deadline_time}
								/>
								<TimelineItem
									label="RSVP Deadline:"
									dateValue="02/20/2020"
									timeValue={proposal.rsvp_deadline_time}
								/>
								<TimelineItem
									label="Question Deadline:"
									dateValue="02/20/2020"
									timeValue={proposal.question_deadline_time}
								/>
							</div>
						</div>
						<div className="m-t-40">
							<Divider ishoverable type="faint" title="RESPONSE SHEET" classes="" isNumbered number="3" />
							<section className="m-t-20 kt-pad-left">
								<QuestionListGroup
									questions={proposal.questions}
								/>
								<div className="m-t-20">
									<DocumentListGroup
										documents={proposal.documents}
									/>
								</div>
							</section>
						</div>
						<div className="m-t-40">
							<Divider ishoverable type="faint" title="INVITED SUPPLIERS" classes="" isNumbered number="4" />
							<div className="kt-pad-left">
								<SupplierDirectorySection
									proposal={proposal}
									deleteSupplier={() => console.log('we can delete the supplier')}
									addSupplier={(suppliers) => console.log('We want to add the suppliers', suppliers)}
								/>
							</div>
						</div>
						<div className="m-t-40">
							<Divider ishoverable type="faint" title="STAKEHOLDERS" classes="" isNumbered number="5" />
							<div className="kt-pad-left">
								{proposal.stakeholders && (
									<div className="m-t-20">
										<StakeholderGroup
											shouldFetchData
											stakeholders={proposal.stakeholders}
											mode="readonly"
											classes="m-b-10"
										/>
									</div>
								)}
							</div>
						</div>
						<div className="m-t-40">
							<Divider ishoverable type="faint" title="ATTACHMENTS" classes="" isNumbered number="6" />
							<div className="kt-pad-left">
								<div className="m-t-20">
									{proposal.files && (
										<FileHandler
											tenantID={tenantID}
											shouldSignUrl
											files={proposal.files}
											objectOwnerID={proposal.id}
										/>
									)}
								</div>
								{proposal.files && proposal.files.length === 0 && (
									<p>There are no files attached to this proposal</p>
								)}
							</div>
						</div>

						{/* <section className="m-t-40">
							<div>
								<Divider type="thick" title="STAKEHOLDERS" classes="" />
								{proposal.stakeholders && (
									<div className="kt-opaque">
										<StakeholderGroup
											shouldFetchData
											stakeholders={proposal.stakeholders}
											mode="readonly"
											classes="m-b-10"
										/>
									</div>
								)}
							</div>
						</section> */}


						{/* <section className="m-t-40">
							<AttachmentListGroup
								files={proposal.files}
							/>
						</section> */}


						{/* <section className="m-t-40">
							<QuestionListGroup
								questions={proposal.questions}
							/>
						</section> */}


						{/* <section className="m-t-40">
							<DocumentListGroup
								documents={proposal.documents}
							/>
						</section> */}
					</div>
				)}
				{/* <section className="m-t-40">
					<Link to={`/rfx/proposal/${params.id}/edit`}>
						<Button content="Edit proposal" className="green" />
					</Link>
				</section> */}
			</div>
			{/* </KtWrapperLite> */}
		</KtWrapper>
	</MainContent>
  );
};

ShowRfp.propTypes = {
  match: PropTypes.object.isRequired,
  getProposal: PropTypes.func.isRequired,
  proposal: PropTypes.object,
  history: PropTypes.object.isRequired,
  tenantID: PropTypes.number.isRequired,
};

ShowRfp.defaultProps = {
  proposal: null,
};

const mapDispatchToProps = {
  getProposal: getCurrentProposal,
};

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
  tenantID: state.tenant.currentTenant.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowRfp));
