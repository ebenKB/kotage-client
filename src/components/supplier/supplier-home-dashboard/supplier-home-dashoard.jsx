/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import Doughnut from '../../graphs/doughnut/doughnut';
import './supplier-home-dashboard.scss';
import GraphItem from '../../graph-item/graph-item';
import BarChart from '../../graphs/barchart/barchart';
import ActivityItem from '../../activity-item/activity-item';

const SupplierHomeDashoard = () => (
	<div>
		<div className="m-t-20 graph-container">
			<GraphItem
				title="Requiring Attention"
			>
				<Doughnut
					className="graph-continer"
					data={
            [
              { label: 'Bid Responses', value: 40 },
              { label: 'Bids Closing Soon', value: 30 },
              { label: 'RSVP Closing Soon', value: 50 },
            ]
            }
					title="Some chart data here"
					colors={['#00000', '#FFFF33', '#70ccd1', '#3e517a', '#b08ea2', '']}
				/>
			</GraphItem>
			<GraphItem
				title="Bids"
			>
				<BarChart
					data={[
					  {
					    label: 'Bids Sent',
					    value: 35,
					  },
					  {
					    label: 'Bids Approved',
					    value: 135,
					  },
					  {
					    label: 'Bids Rejected',
					    value: 25,
					  },
					  ]}
					title="Number of Bids"
					color="#FF6384"
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
              { label: 'Proposals Responded To', value: 40 },
            ]
            }
					title="Some chart data here"
					colors={['#BBB6DF', '#EE82EE']}
				/>
			</GraphItem>
			<GraphItem
				title="Recent Activities"
			>
				<ActivityItem />
			</GraphItem>
		</div>
	</div>
);

export default SupplierHomeDashoard;
