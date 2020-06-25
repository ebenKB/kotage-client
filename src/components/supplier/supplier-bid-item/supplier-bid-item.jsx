/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import KtItem from '../../snippets/kt-list-item-wrapper/kt-item';
import './supplier-bid-item.scss';

const SupplierBidItem = ({ bid }) => (
	<KtItem>
		<div className="bid-item__wrapper">
			<div>
				<span className="bold big-caption kt-primary clickable">
					<Link to={`/rfx/proposal/dashboard/${bid.id}`}>
						<div className="dis-inline-block bold medium-caption kt-primary clickable">
							<span className="kt-primary">{bid.currency.name}</span>
							<span>{' '}</span>
							<span className="kt-primary">{bid.totalBidValue}</span>
						</div>
					</Link>
				</span>
				<div>
					You sent this bid on
					&nbsp;
					{bid.bid_date}
				</div>
			</div>
			<div className="kt-primary">Pending</div>
		</div>
	</KtItem>
);

SupplierBidItem.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default SupplierBidItem;
