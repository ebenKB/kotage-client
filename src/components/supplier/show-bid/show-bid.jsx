/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import Divider from '../../kt-divider/divider';
import MainContent from '../../kt-main-content/mainContent';
import Help from '../../../utils/requisitions/new/help';
import { findBidByID } from '../../../redux/actions/supplierBidActions';
import KtWrapperLite from '../../kt-wrapper-lite/kt-wrapper-lite';
import FileHandler from '../../file-handler/file-handler';

const ShowBid = ({ findBid, currentBid, tenantID }) => {
  const { id } = useParams();
  useEffect(() => {
    findBid(id);
  }, []);
  return (
	<MainContent
		help={Help}
		classes="m-t-20"
	>
		{currentBid && (
			<>
				<KtWrapperLite>
					<Divider type="thick" title="Bid Details" />
					<div className="m-t-20">
						<h2>{currentBid.totalBidValue}</h2>
					</div>
				</KtWrapperLite>
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider type="thick" title="Response To Questions" />
				</KtWrapperLite>
				<KtWrapperLite
					classes="m-t-20"
				>
					<Divider type="thick" title="Commercial Requirements" />
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
					<Divider type="thick" title="Technical Requirements" />
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
			</>
		)}
	</MainContent>
  );
};

const mapDispatchToProps = {
  findBid: findBidByID,
};

const mapStateToProps = (state) => ({
  currentBid: state.supplierBids.currentBid,
  tenantID: state.tenant.currentTenant.id,
});

ShowBid.propTypes = {
  findBid: PropTypes.func.isRequired,
  currentBid: PropTypes.object.isRequired,
  tenantID: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShowBid));
