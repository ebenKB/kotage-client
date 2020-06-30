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
import { findBidByID, deleteBid } from '../../../redux/actions/supplierBidActions';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import FileHandler from '../../file-handler/file-handler';
import RfpTitle from '../supplier-rfp-title/rfp-title';
import KtLoader from '../../loader/loader';
import Modal from '../../modal/modal';

const ShowBid = ({
  findBid,
  currentBid,
  tenantID,
  getSupplierRfpDetails,
  currentRfp,
  loadingRfp,
  deleteBidPermanently,
}) => {
  const { id } = useParams();
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (!hasInit) {
      if (currentBid === null) {
        findBid(id);
      } else if (currentBid) {
        getSupplierRfpDetails(currentBid.rfpID);
        if (currentRfp) {
          setHasInit(true);
        }
      }
    }
  }, [currentBid]);

  const [canShowModal, setCanShowModal] = useState(false);

  const handleDeleteBid = () => {
    console.log('We have to delete the bid');
    deleteBidPermanently(currentBid.id);
  };

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
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider ishoverable type="thick" title="Dangerous Action" classes="" />
					<p className="m-t-10">This action is not reversible.</p>
					<Button
						content="Delete Bid"
						className="kt-danger kt-transparent"
						onClick={() => setCanShowModal(true)}
					/>
					{canShowModal && (
						<Modal
							heading="Dangerous Action"
							type="danger"
							confirmActionText="Delete Permanently"
							handleConfirmAction={handleDeleteBid}
							handleDeclineAction={() => setCanShowModal(false)}
						>
							Please note that this bid will be deleted permanently
						</Modal>
					)}
				</KtWrapperLite>
				<div className="flex-center m-t-40">
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
  deleteBidPermanently: deleteBid,
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
  deleteBidPermanently: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowBid));
