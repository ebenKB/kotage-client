/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import Doughnut from '../../graphs/doughnut/doughnut';
import './supplier-home-dashboard.scss';
import GraphItem from '../../graph-item/graph-item';
import BarChart from '../../graphs/barchart/barchart';

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
			<GraphItem>
				<BarChart
					data={[
					  {
					    label: 'Bids Sent',
					    value: 30,
					  },
					  {
					    label: 'Bids Approved',
					    value: 30,
					  },
					  {
					    label: 'Bids Rejected',
					    value: 35,
					  },
					  ]}
					title="sample 1"
					color="#70CAD1"
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
              { label: 'Proposals Responded To', value: 30 },
            ]
            }
					title="Some chart data here"
					colors={['#BBB6DF', '#EE82EE']}
				/>
			</GraphItem>
			<div className="graph-item bold">Recent activities here</div>
		</div>
		<div className="m-t-50">
			Total Bids Recieved | Total Bids Responded to
		</div>
		<div className="m-t-50">
			Recent Activities - new proposals received
		</div>
	</div>
);

export default SupplierHomeDashoard;
