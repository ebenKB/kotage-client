/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from 'semantic-ui-react';
import { getSupplierRfpByID } from '../../../redux/actions/supplierRfpActions';
import Divider from '../../kt-divider/divider';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import { findBidByID } from '../../../redux/actions/supplierBidActions';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import FileHandler from '../../file-handler/file-handler';
import RfpTitle from '../supplier-rfp-title/rfp-title';
import KtLoader from '../../loader/loader';


const ShowBid = ({
  findBid, currentBid, tenantID, getSupplierRfpDetails, currentRfp, loadingRfp,
}) => {
  const { id } = useParams();
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (!hasInit) {
      if (currentBid === null) {
        findBid(id);
      } else if (currentBid) {
        getSupplierRfpDetails(currentBid.rfpID);
        setHasInit(true);
      }
    }
  }, [currentBid]);
  return (
	<MainContent
		help={Help}
		classes="m-t-20"
	>
		{currentBid && (
			<>
				{loadingRfp && <KtLoader />}
				{!loadingRfp && currentRfp && <RfpTitle classes="m-t-20" />}
				<KtWrapperLite>
					<Divider ishoverable type="thick" title="Bid Details" />
					<div className="m-t-20 dark flex-center">
						Total Bid Value
						<span className="bold">
							&nbsp;
							{currentBid.currency.name}
							{currentBid.totalBidValue}
						</span>
					</div>
					<div className="m-t-10 dar flex-center">
						Submitted on
						<span className="bold">
							&nbsp;
							{format(new Date(currentBid.bid_date), 'iiii do LLLL, yyyy')}
						</span>
					</div>
				</KtWrapperLite>
				{loadingRfp && <KtLoader />}
				{!loadingRfp && currentRfp && (
					<KtWrapperLite
						classes="m-t-20"
					>
						<Divider ishoverable type="thick" title="Proposal Details" />
						<p className="m-t-10">
							<span className="bold">{currentRfp.tenant.company_name.toUpperCase()}</span>
							{' '}
							invited you to this proposal.
							<summary className="sm-caption">{currentRfp.tenant.email}</summary>
						</p>
					</KtWrapperLite>
				)}
				{currentBid.rfpAnswers.length > 0 && (
					<KtWrapperLite
						classes="m-t-20"
					>
						<Divider ishoverable type="thick" title="Response To Questions" />
					</KtWrapperLite>
				)}
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider ishoverable type="thick" title="Commercial Requirements" />
					<div className="m-t-20">
						{currentBid.commercialRequirements && (
							<FileHandler
								details={null}
								files={currentBid.commercialRequirements}
								tenantID={tenantID}
								objectOwnerID={currentBid.id}
								shouldSignUrl
							/>
						)}
					</div>
				</KtWrapperLite>
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider ishoverable type="thick" title="Technical Requirements" />
					<div className="m-t-20">
						{currentBid.technicalRequirements && (
							<FileHandler
								details={null}
								files={currentBid.technicalRequirements}
								tenantID={tenantID}
								objectOwnerID={currentBid.id}
								shouldSignUrl
							/>
						)}
					</div>
				</KtWrapperLite>
				<div className="flex-center m-t-20">
					<Link to="/supplier/bids">
						<Button
							size="tiny"
							content="Go Back"
						/>
					</Link>
					<Link to={`/supplier/bids/${currentBid.id}/revise`}>
						<Button
							size="tiny"
							positive
							content="Revise Bid"
						/>
					</Link>
				</div>
			</>
		)}
	</MainContent>
  );
};

const mapDispatchToProps = {
  findBid: findBidByID,
  getSupplierRfpDetails: getSupplierRfpByID,
};

const mapStateToProps = (state) => ({
  currentBid: state.supplierBids.currentBid,
  tenantID: state.tenant.currentTenant.id,
  currentRfp: state.supplierRfp.currentProposal,
  loadingRfp: state.supplierRfp.loading,
});

ShowBid.propTypes = {
  findBid: PropTypes.func.isRequired,
  currentBid: PropTypes.object.isRequired,
  tenantID: PropTypes.number.isRequired,
  getSupplierRfpDetails: PropTypes.func.isRequired,
  currentRfp: PropTypes.object.isRequired,
  loadingRfp: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowBid));
