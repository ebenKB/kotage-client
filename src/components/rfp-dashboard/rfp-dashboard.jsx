/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getCurrentProposal } from '../../redux/actions/rfpActions';
import Divider from '../kt-divider/divider';
import 'react-circular-progressbar/dist/styles.css';
import './rfp-dashboard.scss';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import KtTransparentInput from '../form-fields/kt-transparent-search-input/kt-trans-input';
import ButtonGroup from '../form-fields/button-group/button-group';

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
		<div>
			{proposal && (
				<div>
					<KtWrapperLite
						classes="m-t-20"
					>
						<div>
							<div className="big-caption bold">{proposal.title}</div>
							<Divider type="thick" title="" classes="m-b-10" />
						</div>
						<div>
							<div>
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
						<section>
							<div className="bid-caption__wrapper">
								<div className="bid-caption">
									<div>
										<div className="bid-caption-item">
											<div className="text-center">
												<div className="xsm-caption m-b-10">Invited Suppliers</div>
												<div className="square-caption">4</div>
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Intend to Bid</div>
												<CircularProgressbar value={60} text={`${3}`} className="bold kt-circular-progress" />
												<div className="xsm-caption m-t-10">(3 of 4)</div>
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Bids Received</div>
												<CircularProgressbar value={75} text={`${3}`} className="bold kt-circular-progress" />
												<div className="xsm-caption m-t-10">(3 of 4)</div>
											</div>
										</div>
									</div>
									<div className="m-t-20">
										<Divider type="faint" title="" classes="m-b-10" />
                    All Bids are due in
										{' '}
										<span className="bold">6</span>
										{' '}
                    days
									</div>
								</div>
								<div>
									<Divider type="faint" title="MESSAGE CENTER" classes="m-b-10" />
									<div>
										<span>
											<p className="sm-caption">You have unanswered questions from your suppliers.</p>
											<span className="bold">3 QUESTIONS</span>
											{' '}
											<span className="sm-caption">need your attention</span>
										</span>
									</div>
									<div className="m-t-20">
										<Button size="tiny" className="green flex flex-center">
                      Message Center
										</Button>
									</div>
								</div>
							</div>
						</section>
					</KtWrapperLite>
					<KtWrapperLite classes="m-t-20">
						<section className="rfp-suppliers">
							<div>
								<Divider type="thick" title="INVITED SUPPLIERS" classes="m-t-10 m-b-10" />
							</div>
							<div className="text-right m-t-20">
								<Button content="Compare Bids" color="green" size="tiny" />
							</div>
							<div className="m-t-20">
								<Divider type="faint" title="" classes="m-b-4" />
								<KtTransparentInput
									classes="fluid kt-transparent-input no-bg"
								/>
								<Divider type="faint" title="" classes="m-t-4" />
							</div>
							<div className="m-t-40">
								<div className="rfp-suppliers__heading m-t-20">
									<div>COMPANY</div>
									<div>STATUS</div>
								</div>
								<div className="rfp-suppliers__item m-b-10 m-t-10 active">
									<div className="bold">APOTICA COMPANY LIMITED</div>
									<div>Submitted on 24/04/2020 @5:30pm</div>
									<div className="text-right">
										<ButtonGroup>
											<Button content="View Bid" />
											<Button content="Bid Action" />
										</ButtonGroup>
									</div>
								</div>
								<div className="rfp-suppliers__item m-b-10 m-t-10 active">
									<div className="bold">ASA SAVINGS AND LOANS</div>
									<div>Submitted on 24/04/2020 @5:30pm</div>
									<div className="text-right">
										<ButtonGroup>
											<Button content="View Bid" />
											<Button content="Bid Action" />
										</ButtonGroup>
									</div>
								</div>
								<div className="rfp-suppliers__item m-b-10 m-t-10">
									<div className="bold">MTN GHANA LIMITED</div>
									<div>Not submitted</div>
									<div className="text-right">
										<ButtonGroup>
											<Button content="View Bid" />
											<Button content="Bid Action" />
										</ButtonGroup>
									</div>
								</div>
								<div className="text-right m-t-20">
									<Button content="Add Supplier" color="green" />
								</div>
							</div>
						</section>
					</KtWrapperLite>
				</div>
			)}
		</div>
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
