/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/boolean-prop-naming */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { findBidByID } from '../../../redux/actions/rfpActions';
import MainContent from '../../../components/kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import RfpTitle from '../../../components/snippets/rfp-title/rfp-title';
import PreviewBid from '../../../components/preview-bid/preview-bid';

const ViewBid = ({
  findRfpBidByID, currentRfp, tenantID, currentTenant,
}) => {
  const { bidID, id } = useParams();
  const [bid, setBid] = useState(null);

  useEffect(() => {
    findRfpBidByID(bidID)
      .then((data) => {
        setBid(data);
      });
  }, [id]);

  return (
	<MainContent
		help={Help}
	>
		<h4>{bid && bid.bid_amount}</h4>
		{bid && (
			<PreviewBid
				currentBid={bid}
				returnUrl={`/rfx/proposal/dashboard/${id}`}
				currentRfp={currentRfp}
				loadingBid={true}
				tenantID={tenantID}
				loadingRfp={true}
				title={<RfpTitle />}
				bidOwnerDetails={{ ...currentTenant, company_name: currentTenant.name }}
			/>
		)}

		{/* <KtWrapperLite>
			<div>
				<h1>
					show details of the bid here
					<div>{bidID}</div>
					{bid && (
						<div>{bid.bid_amount}</div>
					)}
				</h1>
			</div>
		</KtWrapperLite> */}
	</MainContent>
  );
};

const mapDispatchToProps = {
  findRfpBidByID: findBidByID,
};

ViewBid.propTypes = {
  findRfpBidByID: PropTypes.func.isRequired,
  currentRfp: PropTypes.object.isRequired,
  tenantID: PropTypes.string.isRequired,
  currentTenant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentRfp: state.rfp.currentProposal,
  tenantID: state.tenant.currentTenant.id,
  currentTenant: state.tenant.currentTenant,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBid);
