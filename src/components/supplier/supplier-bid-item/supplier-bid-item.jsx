/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import KtItem from '../../snippets/kt-list-item-wrapper/kt-item';
import './supplier-bid-item.scss';

const SupplierBidItem = ({ bid }) => {
  const getLabelColour = () => {
    if (bid.status === 'accepted') {
      return 'green';
    }

    if (bid.status === 'rejected') {
      return 'red';
    }
    return '';
  };

  return (
	<KtItem>
		<div className="bid-item__wrapper">
			<div>
				<span className="bold big-caption kt-primary clickable">
					<Link to={`/supplier/bids/${bid.id}`}>
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
					{format(new Date(bid.bidAt), 'iiii do LLLL, yyyy')}
				</div>
				<div className="xsm-caption flex-center">
					<span>
						{bid.technicalRequirements.length + bid.commercialRequirements.length}
						{' '}
						files attached
					</span>
				</div>
			</div>
			<Label basic size="small" color={getLabelColour()}>
				<span>{bid.status}</span>
			</Label>
		</div>
	</KtItem>
  );
};

SupplierBidItem.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default SupplierBidItem;
