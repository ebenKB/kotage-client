/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SupplierHomeDashoard from '../components/supplier/supplier-home-dashboard/supplier-home-dashoard';

const Home = ({ accountType }) => (
	<div>
		{accountType === 'buyer' && (
			<span>This is the home page.</span>
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
