/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Doughnut from '../../graphs/doughnut/doughnut';
import GraphItem from '../../graph-item/graph-item';
import BarChart from '../../graphs/barchart/barchart';
import ActivityItem from '../../activity-item/activity-item';
import { getAllSupplierBids } from '../../../redux/actions/supplierBidActions';
import './supplier-home-dashboard.scss';
import { getRecentActivities } from '../../../redux/actions/supplierRfpActions';

const SupplierHomeDashoard = ({
  bids, getAllBids, loadingBids, loadingRfp, getAllRecentActivites, recentActivities,
}) => {
  const [hasInit, setInit] = useState(false);
  const [activityPage, setActivityPage] = useState(1);

  useEffect(() => {
    if (!hasInit) {
      if (!recentActivities.data) {
        getAllRecentActivites(activityPage);
      }
    }
    if (bids.length < 1 && !hasInit) {
      getAllBids();
      // if (!loadingBids) {
      //   setInit(true);
      // }
    }
    if (bids && recentActivities && !loadingBids) {
      setInit(true);
    }
  });

  const getTotalBidsSent = () => bids.length;

  // const getTotalBidsResponse = () => {
  //   if (bids) {
  //     return bids.filter((b) => b.status !== 'pending').length;
  //   }
  //   return 0;
  // };

  // const getBidsClosingSoon = () => {
  //   const filteredBids = bids.filter((f) => f.)
  // };

  const getBidsRejected = () => {
    if (bids) {
      return bids.filter((b) => b.status === 'rejected');
    }
    return 0;
  };

  const getBidsPending = () => bids.filter((b) => b.status === 'pending').length;

  const getBidsApproved = () => {
    if (bids) {
      return bids.filter((b) => b.status === 'approved').length;
    }
    return 0;
  };

  const loadMoreRecentActivities = () => {
    const newPage = activityPage + 1;
    setActivityPage(newPage);
    getAllRecentActivites(newPage);
  };

  return (
	<div>
		<p>And show number of unread messages</p>
		<div className="m-t-20 graph-container">
			{bids.length > 0 && (
				<>
					<GraphItem
						title="Requiring Attention"
					>
						<Doughnut
							className="graph-continer"
							data={
            [
              { label: 'Bid Responses', value: 40 },
              { label: 'Proposals Closing Soon', value: 30 },
              { label: 'RSVP Closing Soon', value: 50 },
            ]
            }
							title="Some chart data here"
							colors={['#00000', '#00ae55', '#70ccd1', '#3e517a', '#b08ea2', '']}
						/>
					</GraphItem>
					<GraphItem
						title="Bids"
					>
						<BarChart
							data={[
					  {
					    label: 'Bids Sent',
					    value: getTotalBidsSent(),
					  },
					  {
					    label: 'Bids Approved',
					    value: getBidsApproved(),
					  },
					  {
					    label: 'Bids Rejected',
					    value: getBidsRejected(),
					  },
							  {
					    label: 'Bids Pending',
					    value: getBidsPending(),
					  },
							]}
							title="Number of Bids"
							color="#ffc400"
						/>
					</GraphItem>
					<GraphItem
						title="Proposals"
					>
						<Doughnut
							className="graph-continer"
							data={
            [
              { label: 'Proposals Received', value: 40 },
              { label: 'Proposals Responded To', value: 40 },
              { label: 'Proposals Not Responded To', value: 30 },
            ]
            }
							title="Some chart data here"
							colors={['#BBB6DF', '#EE82EE', '#70aad1']}
						/>
					</GraphItem>
					<GraphItem
						title="Recent Activities"
					>
						<ActivityItem
							recentActivities={recentActivities}
							loadMoreRecords={loadMoreRecentActivities}
							loading={loadingRfp}
						/>
					</GraphItem>
				</>
			)}
		</div>
	</div>
  );
};

const mapDispatchToProps = {
  getAllBids: getAllSupplierBids,
  getAllRecentActivites: getRecentActivities,
};

const mapStateToProps = (state) => ({
  bids: state.supplierBids.bids,
  loadingBids: state.supplierBids.loading,
  loadingRfp: state.supplierRfp.loading,
  recentActivities: state.supplierRfp.recentActivities,
});

SupplierHomeDashoard.propTypes = {
  bids: PropTypes.object.isRequired,
  getAllBids: PropTypes.func.isRequired,
  loadingBids: PropTypes.bool.isRequired,
  loadingRfp: PropTypes.bool.isRequired,
  getAllRecentActivites: PropTypes.func.isRequired,
  recentActivities: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierHomeDashoard);
