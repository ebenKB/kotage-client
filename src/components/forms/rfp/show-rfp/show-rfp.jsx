/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getCurrentProposal } from '../../../../redux/actions/rfpActions';
import Divider from '../../../kt-divider/divider';
import 'react-circular-progressbar/dist/styles.css';
import './show-rfp.scss';
import MainContent from '../../../kt-main-content/mainContent';
import Help from '../../../../utils/requisitions/new/help';
import KtWrapperLite from '../../../kt-wrapper-lite/kt-wrapper-lite';
import StakeholderGroup from '../../../stakeholder-group/stakeholder-group';
import QuestionListGroup from '../../../question-list-group/question-list-group';
import DocumentListGroup from '../../../document-list-group/document-list-group';
import { ReactComponent as MessageIcon } from '../../../../svg/mail.svg';
import AttachmentListGroup from '../../../attachment-list-group/attachment-list-group';

const ShowRfp = ({ match, getProposal, proposal }) => {
  const { params } = match;
  const { id } = params;
  useEffect(() => {
    getProposal(id);
  }, [id]);
  return (
	<MainContent
		help={Help}
	>
		<KtWrapperLite>
			<div>
				{proposal && (
					<div>
						<div>
							<div className="big-caption bold">{proposal.title}</div>
							<Divider type="thick" title="" classes="m-t-10 m-b-10" />
						</div>
						<div>
							<div className="kt-primary">
                Bids due : 02/04/2020 @ 12:30pm UTC (in 6 days)
							</div>
							{/* <span className="kt-primary">
                Bids due:
								&nbsp;
								{ proposal.bid_deadline_date }
								&nbsp;
                @
								&nbsp;
								{ proposal.bid_deadline_time }
								{' '}
                UTC (in 6 days)
							</span> */}
							<Divider type="faint" title="" classes="m-t-10 m-b-10" />
						</div>
						<section className="kt-opaque">
							<div className="bid-caption__wrapper">
								<div className="bid-caption">
									<div>
										<div className="bid-caption-item">
											<div className="text-center">
												<div className="xsm-caption m-b-10">Invited Suppliers</div>
												<CircularProgressbar value={100} text={`${4}`} className="bold kt-circular-progress" />
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Intend to Bid</div>
												<CircularProgressbar value={60} text={`${3}`} className="bold kt-circular-progress" />
												<div className="xsm-caption m-t-10">(3 out of 4)</div>
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Bids Received</div>
												<CircularProgressbar value={75} text={`${3}`} className="bold kt-circular-progress" />
												<div className="xsm-caption m-t-10">(3 out of 4)</div>
											</div>
										</div>
									</div>
									<div className="m-t-20">
                    All Bids are due in
										{' '}
										<span className="bold">6</span>
										{' '}
                    days
									</div>
								</div>
								<div>
									<Divider type="faint" title="MESSAGE CENTER" classes="m-t-10 m-b-10" />
									<div>
										<span>
											<span className="bold">3 QUESTIONS</span>
											{' '}
                      need your attention
										</span>
									</div>
									<div className="m-t-20">
										<Button size="small" className="green flex flex-center">
											<MessageIcon className="dark small logo m-r-10" />
                        Message Center
										</Button>
									</div>
								</div>
							</div>
						</section>
						<section className="rfp-suppliers">
							<div>
								<Divider type="thick" title="INVITED SUPPLIERS" classes="m-t-10 m-b-10" />
							</div>
							<div className="rfp-suppliers__heading">
								<div>COMPANY</div>
								<div>STATUS</div>
							</div>
							<div className="rfp-suppliers__item m-b-10 m-t-10 active">
								<div className="bold">APOTICA COMPANY LIMITED</div>
								<div>Submitted on 24/04/2020 @5:30pm</div>
								<div className="text-right">
									<Link to="/" className="kt-primary">
										<Button className="default" size="small" content="View Bid" />
									</Link>
								</div>
							</div>
							<div className="rfp-suppliers__item m-b-10 m-t-10 active">
								<div className="bold">ASA SAVINGS AND LOANS</div>
								<div>Submitted on 24/04/2020 @5:30pm</div>
								<div className="text-right">
									<Link to="/" className="kt-primary">
										<Button className="default" size="small" content="View Bid" />
									</Link>
								</div>
							</div>
							<div className="rfp-suppliers__item m-b-10 m-t-10">
								<div className="bold">MTN GHANA LIMITED</div>
								<div>Not submitted</div>
								<div className="text-right">
									<Link to="/" className="kt-primary">
										<Button className="default" size="small" content="View Bid" />
									</Link>
								</div>
							</div>
						</section>
						<section className="m-t-40">
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
						</section>
						<section className="m-t-40">
							<AttachmentListGroup
								files={proposal.files}
							/>
						</section>
						<section className="m-t-40">
							<QuestionListGroup
								questions={proposal.questions}
							/>
						</section>
						<section className="m-t-40">
							<DocumentListGroup
								documents={proposal.documents}
							/>
						</section>
					</div>
				)}
				<section className="m-t-40">
					<Link to={`/rfx/proposal/${params.id}/edit`}>
						<Button content="Edit proposal" className="green" />
					</Link>
				</section>
			</div>
		</KtWrapperLite>
	</MainContent>
  );
};

ShowRfp.propTypes = {
  match: PropTypes.object.isRequired,
  getProposal: PropTypes.func.isRequired,
  proposal: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  getProposal: getCurrentProposal,
};

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowRfp));
