/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Button, Input, Form, Label,
} from 'semantic-ui-react';
// import PreviewBid from '../../../preview-bid/preview-bid';
import { getSupplierRfpByID } from '../../redux/actions/supplierRfpActions';
import Divider from '../kt-divider/divider';
import { findBidByID, deleteBid } from '../../redux/actions/supplierBidActions';
import KtWrapperLite from '../kt-wrapper-lite/kt-wrapper-lite';
import FileHandler from '../file-handler/file-handler';
import RfpTitle from '../supplier/supplier-rfp-title/rfp-title';
import KtLoader from '../loader/loader';
import Modal from '../modal/modal';
import FileHandlerContext from '../../context/file-handler.context';
import Can from '../can/can';
import BidQuestionResponseGroup from '../bid-question-response-group/bid-question-response-group';

const PreviewBid = ({
  currentBid,
  currentRfp,
  returnUrl,
  reviseBidUrl,
  tenantID,
  loadingRfp,
  loadingBid,
  accountType,
  bidOwnerDetails,
  deleteBidPermanently,
  title,
  isAdmin,
}) => {
  const [bidToDelete, setBidToDelete] = useState('');
  const history = useHistory();

  const [canShowModal, setCanShowModal] = useState(false);

  const handleDeleteBid = () => {
    if (bidToDelete === currentRfp.title) {
      deleteBidPermanently(currentBid.id,
        currentBid.proposal_request_id,
        currentBid.event_owner_id);
      setCanShowModal(false);
      history.push('/supplier/bids');
    }
  };

  const handleBidToDeleteChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setBidToDelete(value);
  };

  const getColor = () => {
    if (currentBid.status === 'accepted') {
      return 'green';
    }

    if (currentBid.status === 'rejected') {
      return 'red';
    }
    return 'grey';
  };
  return (
	<div>
		{loadingRfp && (
			<div className="m-b-10"><KtLoader /></div>
		) }
		{currentBid && (
			<>
				{title}
				<KtWrapperLite>
					<Divider ishoverable type="thick" title="Bid Details" />
					<div className="m-t-20 dark flex-center">
						{/* Total Bid Value */}
						<span className="bold">
							&nbsp;
							{currentBid.currency.name}
							<span className="big-caption">{currentBid.totalBidValue}</span>
						</span>
					</div>
					<div className="m-t-10 dar flex-center">
						Submitted on
						<span className="bold">
							&nbsp;
							{format(new Date(currentBid.bidAt), 'iiii do LLLL, yyyy')}
						</span>
					</div>
					<div className="m-t-10 m-b-10">
						<span>Bid status</span>
						<Label color={getColor()}>{currentBid.status}</Label>
					</div>
				</KtWrapperLite>
				{loadingRfp && (
					<div className="m-t-10">
						<KtLoader />
					</div>
				)}
				{!loadingRfp && bidOwnerDetails && (
					<Can
						accountType={accountType}
						roleType={isAdmin === true ? 'admin' : 'user'}
						perform="supplier:view_rfp_bid_owner"
						yes={() => (
							<KtWrapperLite
								classes="m-t-20"
							>
								<Divider ishoverable type="thick" title="Proposal Details" />
								<p className="m-t-10">
									<span className="bold">{bidOwnerDetails.company_name.toUpperCase()}</span>
									{' '}
									invited you to this proposal.
									<summary className="sm-caption">{bidOwnerDetails.email}</summary>
								</p>
							</KtWrapperLite>
						)}
						no={() => null}
					/>
				)}
				{currentBid.rfpAnswers.length > 0 && (
					<KtWrapperLite
						classes="m-t-20"
					>
						<Divider ishoverable type="thick" title="Response To Questions" />
						<BidQuestionResponseGroup accountType={accountType} data={currentBid.rfpAnswers} />
					</KtWrapperLite>
				)}
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider ishoverable type="thick" title="Commercial Requirements" />
					<div className="m-t-20">
						{bidOwnerDetails && currentBid.commercialRequirements && (
							<FileHandlerContext.Provider
								value={(
									<div>
										<RfpTitle />
										<div>{bidOwnerDetails.company_name}</div>
										<div>{bidOwnerDetails.email}</div>
									</div>
								)}
							>
								<FileHandler
									details={null}
									files={currentBid.commercialRequirements}
									tenantID={tenantID}
									objectOwnerID={currentBid.id}
									shouldSignUrl
								/>
							</FileHandlerContext.Provider>
						)}
					</div>
				</KtWrapperLite>
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider ishoverable type="thick" title="Technical Requirements" />
					<div className="m-t-20">
						{bidOwnerDetails && currentBid.technicalRequirements && (
							<FileHandlerContext.Provider
								value={(
									<div>
										<RfpTitle />
										<div>{bidOwnerDetails.company_name}</div>
										<div>{bidOwnerDetails.email}</div>
									</div>
								)}
							>
								<FileHandler
									details={null}
									files={currentBid.technicalRequirements}
									tenantID={tenantID}
									objectOwnerID={currentBid.id}
									shouldSignUrl
								/>
							</FileHandlerContext.Provider>
						)}
					</div>
				</KtWrapperLite>
				<Can
					perform="supplier:delete_rfp_bid"
					accountType={accountType}
					roleType={isAdmin === true ? 'admin' : 'user'}
					yes={() => (
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
									loading={loadingBid}
									confirmActionText="Delete Permanently"
									handleConfirmAction={handleDeleteBid}
									handleDeclineAction={() => setCanShowModal(false)}
								>
									<Form.Field>
										<label htmlFor="confirmDelete">
											<div className="m-b-10">Enter title of the proposal to delete Bid.</div>
										</label>
										<Input
											type="text"
											name="bidToDelete"
											fluid
											value={bidToDelete}
											onChange={handleBidToDeleteChange}
										/>
									</Form.Field>
								</Modal>
							)}
						</KtWrapperLite>
					)}
					no={() => null}
				/>
				<div className="flex-center m-t-40">
					<Link to={returnUrl}>
						<Button
							size="tiny"
							content="Go Back"
						/>
					</Link>
					<Can
						perform="supplier:revise_rfp_bid"
						accountType={accountType}
						roleType={isAdmin === true ? 'admin' : 'user'}
						yes={() => (
							<Link to={reviseBidUrl}>
								<Button
									size="tiny"
									positive
									content="Revise Bid"
								/>
							</Link>
						)}
						no={() => null}
					/>
				</div>
			</>
		)}
	</div>
  );
};

const mapDispatchToProps = {
  findBid: findBidByID,
  getSupplierRfpDetails: getSupplierRfpByID,
  deleteBidPermanently: deleteBid,
};

const mapStateToProps = (state) => ({
  tenantID: state.tenant.currentTenant.id,
  loadingRfp: state.supplierRfp.loading,
  loadingBid: state.supplierBids.loading,
  accountType: state.app.accountType,
  isAdmin: state.user.currentUser.is_admin,
});

PreviewBid.propTypes = {
  currentBid: PropTypes.object.isRequired,
  tenantID: PropTypes.number.isRequired,
  currentRfp: PropTypes.object,
  loadingRfp: PropTypes.bool.isRequired,
  deleteBidPermanently: PropTypes.func.isRequired,
  loadingBid: PropTypes.bool.isRequired,
  returnUrl: PropTypes.string.isRequired,
  title: PropTypes.object.isRequired,
  bidOwnerDetails: PropTypes.object.isRequired,
  accountType: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  reviseBidUrl: PropTypes.bool,
};


PreviewBid.defaultProps = {
  currentRfp: null,
  reviseBidUrl: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PreviewBid));
