/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';
// import ButtonGroup from '../../form-fields/button-group/button-group';
import PopupDropdown from '../popup/popup';
import { getRfpSupplierDetails, acceptRfpBid, rejectRfpBid } from '../../../redux/actions/rfpActions';
import KtLoader from '../../loader/loader';
import RfpSupplierItemWrapper from '../../rfp-supplier-item-wrapper/rfp-supplier-item-wrapper';

const SupplierDetailsCaption = ({
  type,
  match,
  supplier,
  getSupplierProposalDetails,
  currentProposalID,
  buyerAcceptRfpBid,
  buyerRejectRfpBid,
}) => {
  const [isLoadingBidDetails, setLoading] = useState(true);
  const [bidDetails, setBidDetails] = useState(null);
  const [isAcceptingBid, setAcceptingBid] = useState(false);
  const [isRejectingBid, setIsRejectingBid] = useState(false);
  const { url } = match;

  useEffect(() => {
    if (!bidDetails) {
      // fetch details of the bid
      getSupplierProposalDetails(currentProposalID, supplier.supplier_id)
        .then(({ data: { rfp_claim } }) => {
          setLoading(false);
          setBidDetails({ ...rfp_claim });
        });
    }
  }, []);

  const handleBuyerAcceptBid = () => {
    setAcceptingBid(true);
    buyerAcceptRfpBid(supplier.proposal_request_id, supplier.bidID)
      .then(() => setAcceptingBid(false))
      .catch(() => setAcceptingBid(false));
  };

  const handleRejectBid = () => {
    setIsRejectingBid(true);
    buyerRejectRfpBid(supplier.proposal_request_id, supplier.bidID)
      .then(() => setIsRejectingBid(false))
      .catch(() => setIsRejectingBid(false));
  };

  return (
	<div>
		{isLoadingBidDetails && (<KtLoader />)}
		{bidDetails && bidDetails.has_responded && supplier && (
			<RfpSupplierItemWrapper
				classes="m-b-10 m-t-10"
				type="active"
			>
				<div className="bold">{supplier.company_name.toUpperCase()}</div>
				{bidDetails && (
					<div>
						Submitted on &nbsp;
						{format(new Date(bidDetails.responded_at), 'iiii do LLLL, yyyy')}
					</div>
				)}
				<div className="text-right">
					<Link to={`${url}/bids/${supplier.bidID}/view`}>
						<Button basic content="View Bid" />
					</Link>
					<Button
						positive
						content={(
							<PopupDropdown
								trigger="Bid Action"
								position="top center"
							>
								<div className="flex-center">
									<Button
										basic
										content="Decline"
										disabled={!supplier.buyerAccepted}
										loading={isRejectingBid}
										onClick={handleRejectBid}
									/>
									<Button
										basic
										positive
										content="Accept"
										disabled={supplier.buyerAccepted}
										onClick={handleBuyerAcceptBid}
										loading={isAcceptingBid}
									/>
								</div>
							</PopupDropdown>
						)}
					/>
				</div>
			</RfpSupplierItemWrapper>
		)}
		{type === 'pending' && supplier && (
			<div className="rfp-suppliers__item m-b-10 m-t-10">
				<div className="bold">{supplier.name.toUpperCase()}</div>
				<div>Not submitted</div>
			</div>
		)}
	</div>
  );
};

const mapDispatchToProps = {
  getSupplierProposalDetails: getRfpSupplierDetails,
  buyerAcceptRfpBid: acceptRfpBid,
  buyerRejectRfpBid: rejectRfpBid,
};

const mapStateToProps = (state) => ({
  currentProposalID: state.rfp.currentProposal.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SupplierDetailsCaption));
