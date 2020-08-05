/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';

import PreviewBid from '../../preview-bid/preview-bid';
import { getSupplierRfpByID } from '../../../redux/actions/supplierRfpActions';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import { findBidByID, deleteBid } from '../../../redux/actions/supplierBidActions';
import KtLoader from '../../loader/loader';
import SupplierRfpTitle from '../supplier-rfp-title/rfp-title';


const ShowBid = ({
  findBid,
  currentBid,
  tenantID,
  getSupplierRfpDetails,
  currentRfp,
  loadingRfp,
  loadingBid,
}) => {
  const { id } = useParams();
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (!hasInit) {
      findBid(id);
    }
  }, []);

  useEffect(() => {
    if (currentBid !== null) {
      getSupplierRfpDetails(currentBid.rfpID, currentBid.event_owner_id);
      if (currentRfp) {
        setHasInit(true);
      }
    }
  }, [currentBid]);

  return (
	<MainContent
		help={Help}
		classes="m-t-20"
	>
		{loadingRfp && (
			<div className="m-b-10"><KtLoader /></div>
		) }
		{currentBid && currentRfp && (
			<PreviewBid
				currentBid={currentBid}
				returnUrl="/supplier/bids"
				currentRfp={currentRfp}
				loadingBid={loadingBid}
				tenantID={tenantID}
				loadingRfp={loadingRfp}
				title={<SupplierRfpTitle classes="m-t-20" />}
				bidOwnerDetails={currentRfp.tenant}
				reviseBidUrl={`/supplier/bids/${currentBid.id}/revise`}
			/>
		)}
	</MainContent>
  );
};

const mapDispatchToProps = {
  findBid: findBidByID,
  getSupplierRfpDetails: getSupplierRfpByID,
  deleteBidPermanently: deleteBid,
};

const mapStateToProps = (state) => ({
  currentBid: state.supplierBids.currentBid,
  tenantID: state.tenant.currentTenant.id,
  currentRfp: state.supplierRfp.currentProposal,
  loadingRfp: state.supplierRfp.loading,
  loadingBid: state.supplierBids.loading,
});

ShowBid.propTypes = {
  findBid: PropTypes.func.isRequired,
  currentBid: PropTypes.object.isRequired,
  tenantID: PropTypes.number.isRequired,
  getSupplierRfpDetails: PropTypes.func.isRequired,
  currentRfp: PropTypes.object.isRequired,
  loadingRfp: PropTypes.bool.isRequired,
  loadingBid: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowBid));
