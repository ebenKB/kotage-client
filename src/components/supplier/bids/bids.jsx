/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MainContent from '../../kt-main-content/mainContent';
import KtWrapper from '../../kt-wrapper/kt-wrapper';
import { getAllSupplierBids } from '../../../redux/actions/supplierBidActions';
import SupplierBidItem from '../supplier-bid-item/supplier-bid-item';

const Bids = ({ getBids, bids }) => {
  useEffect(() => { getBids(); }, []);

  return (
	<MainContent>
		<KtWrapper
			header="Sent Bids"
		>
			{bids && bids.map((bid) => (
				<SupplierBidItem
					bid={bid}
					key={bid.id}
				/>
			))}
		</KtWrapper>
	</MainContent>
  );
};

const mapDispatchToProps = {
  getBids: getAllSupplierBids,
};

const mapStateToProps = (state) => ({
  bids: state.supplierBids.bids,
});

Bids.propTypes = {
  getBids: PropTypes.func.isRequired,
  bids: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bids);
