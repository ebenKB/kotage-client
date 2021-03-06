/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Button, Checkbox } from 'semantic-ui-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { formatDistance } from 'date-fns';
import {
  getCurrentProposal, publishRfp, getRfpSuppliers, getRfpAnalytics, getRfpBids,
} from '../../redux/actions/rfpActions';
import Divider from '../kt-divider/divider';
import 'react-circular-progressbar/dist/styles.css';
import './rfp-dashboard.scss';
import MainContent from '../kt-main-content/mainContent';
import Help from '../../utils/requisitions/new/help';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import KtTransparentInput from '../form-fields/kt-transparent-search-input/kt-trans-input';
import FormGroup from '../form-fields/form-group/form-group';
import SupplierDetailsCaptionGroup from '../snippets/supplier-details-caption-group/supplier-details-caption-group';
import RfpTitle from '../snippets/rfp-title/rfp-title';
import EmptyContentWrapper from '../empty-content-wrapper/empty-content-wrapper';

const RfpDashboard = ({
  match,
  getProposal,
  proposal,
  // proposalBids,
  publishEvent,
  isPublishingRfp,
  getProposalBids,
  getSuppliersForProposal,
  getProposalAnalytics,
}) => {
  const { params, url } = match;
  const { id } = params;
  const [searchInput, setSearchInput] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [rfpBidSuppliers, setRfpBidSuppliers] = useState(null);

  useEffect(() => {
    getProposal(id);
    getSuppliersForProposal();
  }, [id]);

  useEffect(() => {
    if (!analytics) {
      getProposalAnalytics(id)
        .then(({ data }) => {
          setAnalytics({ ...data.rfp_analytics[0] });
        });
    }

    let bidData = null;

    // if (!proposalBids || proposalBids.length < 1) {
    getProposalBids(id)
      .then((data) => {
        bidData = data;
        const suppliers = bidData.map((d) => ({
          ...d.supplier,
          bidID: d.id,
          buyerAccepted: d.buyerAccepted,
          proposal_request_id: d.proposal_request_id,
          status: d.status,
        }));
        setRfpBidSuppliers(suppliers);
      });
    // } else {
    //   bidData = proposalBids;
    // }
  }, []);

  // the total number of suppliers who have sent their RSVP
  const getTotalRSVP = () => {
    if (analytics) {
      return (analytics.intend_to_bid + analytics.already_submitted_bid);
    }
    return null;
  };

  // get the total number of suppliers who have sent their RSVP but have not submitted any bid
  const getIntendToBid = () => {
    if (analytics) {
      return (
	<>
		{getTotalRSVP()}
		{' '}
		out of
		{' '}
		{analytics.invited_suppliers}
	</>
      );
    }
    return null;
  };

  const getBidsReceived = () => {
    if (analytics) {
      return (
	<>
		{analytics.already_submitted_bid}
		{' '}
		out of
		{' '}
		{getTotalRSVP()}
	</>
      );
    }
    return null;
  };
  /**
   * return the found suppliers if the user is searching
   * otherwise return all suppliers
   */
  const getSuppliers = () => {
    if (searchInput.length > 0 || filteredSuppliers.length > 0) {
      return filteredSuppliers;
    }

    if (rfpBidSuppliers) {
      return rfpBidSuppliers;
    }
    return [];
  };

  const handleSearch = (val) => {
    const filteredSupplierRecords = rfpBidSuppliers
      .filter((s) => s.company_name.toLocaleLowerCase()
        .match(new RegExp(val.trim().toLocaleLowerCase(), 'g')));
    setFilteredSuppliers(filteredSupplierRecords);
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    handleSearch(value);
  };

  const handlePublishRfp = () => {
    if (proposal) {
      publishEvent(proposal.id);
    }
  };

  return (
	<MainContent
		help={Help}
	>
		<div>
			{proposal && (
				<div>
					<RfpTitle classes="m-t-20" />
					<KtWrapperLite
						classes="m-t-20"
					>
						<div>
							<span className="kt-primary">
								Bids due:
								&nbsp;
								{ proposal.bid_deadline_date }
								&nbsp;
								@
								&nbsp;
								{ proposal.bid_deadline_time }
								{' '}
								UTC (
								{formatDistance(new Date(proposal.bid_deadline_date), new Date())}
								)
							</span>
							<Divider type="faint" title="" classes="m-t-10 m-b-10" />
						</div>
						<section>
							<div className="bid-caption__wrapper">
								<div className="bid-caption">
									<div>
										<div className="bid-caption-item">
											<div className="text-center">
												<div className="xsm-caption m-b-10">Invited Suppliers</div>
												<div className="square-caption">
													{proposal.suppliers && proposal.suppliers.length}
												</div>
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Intend to Bid</div>
												{analytics && (
													<CircularProgressbar
														value={((getTotalRSVP() / analytics.invited_suppliers) * 100)}
														text={`${getTotalRSVP()}`}
														className="bold kt-circular-progress"
														strokeWidth={12}
													/>
												)}
												<div className="xsm-caption m-t-10">{getIntendToBid()}</div>
											</div>
											<div className="text-center">
												<div className="xsm-caption m-b-10">Bids Received</div>
												{analytics && (
													<CircularProgressbar
														value={((analytics.already_submitted_bid / getTotalRSVP()) * 100)}
														text={`${getTotalRSVP()}`}
														className="bold kt-circular-progress"
														strokeWidth={12}
													/>
												)}
												<div className="xsm-caption m-t-10">{getBidsReceived()}</div>
											</div>
										</div>
									</div>
									<div className="m-t-20">
										<Divider type="faint" title="" classes="m-b-10" />
										All Bids are due in
										{' '}
										<span className="bold">
											{formatDistance(new Date(proposal.bid_deadline_date), new Date())}
										</span>
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
										<Link to={`${url}/message`}>
											<Button size="tiny" className="green" content="Message Center" />
										</Link>
									</div>
								</div>
							</div>
						</section>
					</KtWrapperLite>
					<KtWrapperLite classes="m-t-20">
						<section className="rfp-suppliers">
							<div>
								<Divider type="faint" title="INVITED SUPPLIERS" classes="m-t-10 m-b-10 p-b-10" />
							</div>
							<div className="text-right m-t-20">
								<Link to={`/rfx/proposal/${proposal.id}/compare-bids`}>
									<Button content="Compare Bids" positive size="tiny" />
								</Link>
							</div>
							<div className="m-t-20">
								<Divider type="faint" title="" classes="m-b-4" />
								<KtTransparentInput
									classes="fluid kt-transparent-input no-bg"
									handleSearch={(value) => handleSearchInputChange(value)}
								/>
								<Divider type="faint" title="" classes="m-t-4" />
							</div>
							<SupplierDetailsCaptionGroup suppliers={getSuppliers()} />
							{getSuppliers().length < 1 && (
								<div className="m-t-20 m-b-20">
									<EmptyContentWrapper message="No matching supplier found" />
								</div>
							)}
						</section>
					</KtWrapperLite>
					<KtWrapperLite classes="m-t-20">
						<Divider type="faint" title="RFP OPTIONS" classes="m-t-20 m-b-20 p-b-10" />
						<div className="m-t-20">
							<FormGroup
								label="Allow Late Bids:"
								classes="custom"
							>
								<Checkbox
									disabled
									label="Allow suppliers to submit their Bids after submission deadline"
									checked={proposal.allow_revise_bids}
								/>
							</FormGroup>
							<FormGroup
								label="Revise Bids:"
								classes="m-t-20 custom"
							>
								<Checkbox
									checked={proposal.allow_late_bids}
									disabled
									label="Allow suppliers to revise their Bids after submission deadline"
								/>
							</FormGroup>
						</div>
					</KtWrapperLite>
					<div className="footer flex-center">
						{proposal.published_at === null && (
							<div className="m-t-20">
								<Button
									size="tiny"
									content="Publish"
									positive
									onClick={handlePublishRfp}
									loading={isPublishingRfp}
								/>
							</div>
						)}
						<div className="m-t-20">
							<Link to={`/rfx/proposal/show/${proposal.id}`}>
								<Button
									size="tiny"
									content="View RFP Details"
									positive
								/>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	</MainContent>
  );
};

RfpDashboard.propTypes = {
  match: PropTypes.object.isRequired,
  getProposal: PropTypes.func.isRequired,
  proposal: PropTypes.object,
  // proposalBids: PropTypes.object.isRequired,
  publishEvent: PropTypes.func.isRequired,
  isPublishingRfp: PropTypes.bool.isRequired,
  getSuppliersForProposal: PropTypes.func.isRequired,
  getProposalAnalytics: PropTypes.func.isRequired,
  getProposalBids: PropTypes.func.isRequired,
};

RfpDashboard.defaultProps = {
  proposal: [],
};

const mapDispatchToProps = {
  getProposal: getCurrentProposal,
  publishEvent: publishRfp,
  getSuppliersForProposal: getRfpSuppliers,
  getProposalAnalytics: getRfpAnalytics,
  getProposalBids: getRfpBids,
};

const mapStateToProps = (state) => ({
  proposal: state.rfp.currentProposal,
  isPublishingRfp: state.ui.buyer.isPublishingRfp,
  proposalBids: state.rfp.proposalBids,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RfpDashboard));
