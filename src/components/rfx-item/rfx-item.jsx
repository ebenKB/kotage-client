/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Label } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../svg/cart.svg';
import './rfx-item.scss';

const RfpItem = ({ type, proposal }) => (
	<div className="kt-list__item rfx-item">
		<div className="icon-caption">
			<Logo />
		</div>
		<div className="kt-list__item-content">
			<div>
				<span className="bold big-caption kt-primary clickable">
					<Link to="/requisitions/id">
						<div className="dis-inline-block bold big-caption kt-primary clickable">
							{(((proposal && proposal.title === null) || (proposal === null)) && ('Title of the Proposal'))}
							{ proposal && proposal.title }
						</div>
					</Link>
				</span>
				<Label
					size="mini"
					color={`${type.toLowerCase() === 'published' ? 'green' : 'red'}`}
					className={`${type === 'published' ? 'kt-success' : 'kt-danger'}`}
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
);

RfpItem.propTypes = {
  type: PropTypes.string.isRequired,
  proposal: PropTypes.object.isRequired,
};

export default RfpItem;
