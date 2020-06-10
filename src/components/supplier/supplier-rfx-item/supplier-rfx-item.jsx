/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import { ReactComponent as Logo } from '../../../svg/cart.svg';
import './supplier-rfx-item.scss';

const RfpItem = ({ proposal, type }) => {
  const getDate = () => format(new Date(proposal.bid_deadline_date), 'EEEE, do MMMM, yyyy');

  return (
    (proposal && (
	<div className="kt-list__item rfx-item">
		<div className="icon-caption">
			<Logo />
		</div>
		<div className="kt-list__item-content">
			<div>
				<span className="bold big-caption kt-primary clickable">
					<Link to={`/supplier/rfp/dashboard/${proposal.id}`}>
						<div className="dis-inline-block bold big-caption kt-primary clickable">
							{(((proposal && proposal.title === null) || (proposal === null)) && ('Title of the Proposal'))}
							{ proposal && proposal.title }
						</div>
					</Link>
				</span>
				<Label
					size="mini"
					color={`${type.toLowerCase() === 'rfp' ? 'green' : 'red'}`}
					className={`${type.toLowerCase() === 'rfp' ? 'kt-success' : 'kt-danger'}`}
				>
					{ type }
				</Label>
				<div className="sm-caption">
					From
					<span>&nbsp;</span>
					<span className="bold">{proposal.tenant.company_name}</span>
					<div>
						<span>
							The deadline for sending your bid response is
							{' '}
						</span>
						<span className="kt-danger">{getDate()}</span>
						<div>{proposal.bid_deadline_date}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    ))
  );
};

RfpItem.propTypes = {
  proposal: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default RfpItem;
