/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../svg/cart.svg';
import './supplier-rfx-item.scss';

const RfpItem = ({ proposal, type }) => (proposal && (
	<div className="kt-list__item rfx-item">
		<div className="icon-caption">
			<Logo />
		</div>
		<div className="kt-list__item-content">
			<div>
				<span className="bold big-caption kt-primary clickable">
					<Link to={`/supplier/events/dashboard/${proposal.id}`}>
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
					This proposal was created by
					{' '}
					<span className="bold">Alexander Churchill</span>
					{' '}
					<span>on </span>
					<span className="bold">23 May, 2018</span>
					<div>
						<span>
							The deadline for the proposal is
							{' '}
						</span>
						<span className="bold">1st April, 2018</span>
					</div>
				</div>
			</div>
		</div>
	</div>
));

RfpItem.propTypes = {
  proposal: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default RfpItem;
