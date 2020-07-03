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
import {
  getRecentActivities,
  getSupplierRfpAnalytics,
  getSupplierRfpClosing,
  getRSVPClosingSoon,
} from '../../../redux/actions/supplierRfpActions';

const SupplierHomeDashoard = ({
  bids,
  getAllBids,
  loadingBids,
  loadingRfp,
  getAllRecentActivites,
  recentActivities,
  getRfpAnalytics,
  analytics,
  getSupplierRfpCloingSoon,
  getSupplierRSVPClosingSoon,
}) => {
  const [hasInit, setInit] = useState(false);
  const [activityPage, setActivityPage] = useState(1);
  const [canShowDeadlines, setCanShowDeadlines] = useState(false);
  const [canShowRecentActivities, setCanShowRecentActivities] = useState(false);

  useEffect(() => {
    if (!hasInit) {
      if (!recentActivities.data) {
        getAllRecentActivites(activityPage);
      }

      if (!analytics) {
        getRfpAnalytics();
        const today = new Date();
        const closingDate = new Date();
        closingDate.setDate(today.getDate() + 31);
        const startDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        const endDate = `${closingDate.getFullYear()}-${closingDate.getMonth()}-${closingDate.getDate()}`;
        getSupplierRfpCloingSoon(startDate, endDate);
        getSupplierRSVPClosingSoon(startDate, endDate);
      }

      if (bids.length < 1) {
        getAllBids();
      }
    }
    if (bids && recentActivities && analytics && !loadingBids) {
      setInit(true);
    }

    if (recentActivities.data && recentActivities.data.length > 0) {
      setCanShowRecentActivities(true);
    }

    if (analytics && analytics.proposalsClosingSoon && analytics.RSVPClosingSoon) {
      setCanShowDeadlines(true);
    }
  }, [hasInit, analytics, recentActivities]);

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
      return bids.filter((b) => b.status === 'rejected').length;
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

  // const checkIfCanShowDeadlines = () => analytics
  //   && analytics.proposalsClosingSoon && analytics.RSVPClosingSoon;

  const loadMoreRecentActivities = () => {
    const newPage = activityPage + 1;
    setActivityPage(newPage);
    getAllRecentActivites(newPage);
  };

  return (
	<div>
		<p>And show number of unread messages</p>
		<div className="m-t-20 graph-container">
			<>
				{canShowDeadlines && (
					<GraphItem
						title="Requiring Attention"
					>
						<Doughnut
							className="graph-continer"
							data={
                  [
                    { label: 'Proposals Closing Soon', value: analytics.proposalsClosingSoon },
                    { label: 'RSVP Closing Soon', value: analytics.RSVPClosingSoon },
                  ]
                }
							title="Some chart data here"
							colors={['#de7163', '#70ccd1']}
						/>
					</GraphItem>
				)}
				{bids.length > 0 && (
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
				)}
				{analytics && (
					<GraphItem
						title="Proposals"
					>
						<Doughnut
							className="graph-continer"
							data={
            [
              { label: 'Proposals Received', value: analytics.eventInvites },
              { label: 'Proposals Responded To', value: analytics.bidSubmitted },
              { label: 'Proposals Not Responded To', value: analytics.notAttendedTo },
            ]
            }
							title="Some chart data here"
							colors={['#BBB6DF', '#EE82EE', '#70aad1']}
						/>
					</GraphItem>
				)}
				{canShowRecentActivities > 0 && (
					<GraphItem
						title="Recent Activities"
					>
						<ActivityItem
							recentActivities={recentActivities}
							loadMoreRecords={loadMoreRecentActivities}
							loading={loadingRfp}
						/>
					</GraphItem>
				)}
			</>
		</div>
	</div>
  );
};

const mapDispatchToProps = {
  getAllBids: getAllSupplierBids,
  getAllRecentActivites: getRecentActivities,
  getRfpAnalytics: getSupplierRfpAnalytics,
  getSupplierRfpCloingSoon: getSupplierRfpClosing,
  getSupplierRSVPClosingSoon: getRSVPClosingSoon,
};

const mapStateToProps = (state) => ({
  analytics: state.supplierRfp.analytics,
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
  getRfpAnalytics: PropTypes.func.isRequired,
  analytics: PropTypes.object.isRequired,
  getSupplierRfpCloingSoon: PropTypes.func.isRequired,
  getSupplierRSVPClosingSoon: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierHomeDashoard);
