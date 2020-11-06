/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SupplierHomeDashoard from '../components/supplier/supplier-home-dashboard/supplier-home-dashoard';
import GraphItem from '../components/graph-item/graph-item';
import Doughnut from '../components/graphs/doughnut/doughnut';

const Home = ({ accountType }) => (
	<div>
		{accountType === 'buyer' && (
			<div className="home-graph__items">
				<GraphItem
					title="Requiring Attention"
					subtitle="Events closing in 30 days"
				>
					<Doughnut
						className="graph-continer"
						data={
                  [
                    { label: 'Proposals Closing Soon', value: 40 },
                    { label: 'RSVP Closing Soon', value: 30 },
                  ]
                }
						title="Some chart data here"
						colors={['#de7163', '#70ccd1']}
					/>
				</GraphItem>
				<GraphItem
					title="Requiring Attention"
					subtitle="Events closing in 30 days"
				>
					<Doughnut
						className="graph-continer"
						data={
                  [
                    { label: 'Proposals Closing Soon', value: 90 },
                    { label: 'RSVP Closing Soon', value: 20 },
                  ]
                }
						title="Some chart data here"
						colors={['#de3463', '#70bbd1']}
					/>
				</GraphItem>
			</div>
		)}
		{accountType === 'supplier' && (
			<SupplierHomeDashoard />
		)}
	</div>
);

const mapStateToProps = (state) => ({
  accountType: state.app.accountType,
});

Home.propTypes = {
  accountType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Home);
