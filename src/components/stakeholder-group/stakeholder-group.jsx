/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Stakeholders from '../snippets/add-stakeholder/add-stakeholder';
import Divider from '../kt-divider/divider';
import './stakeholder.scss';
import StakeholderItem from '../stakeholder-item/stakeholder-item';


const StakeholderGroup = ({ stakeholders }) => (
	<div>
		<div>
			<div className="sm-caption faint m-t-20 m-b-10 form-item stakeholder-group">
				<div className="faint-caption">NAME OR EMAIL</div>
				<div className="light-caption">PERMISSIONS</div>
				<div className="light-caption">ACTION</div>
			</div>
			<Divider type="faint" title="" classes="form-item m-t-8" isNumbered={false} />
			{stakeholders && stakeholders.map((stakeholder) => (
				<div key={stakeholder.id}>
					<StakeholderItem
						stakeholder={stakeholder}
					/>
					<Divider type="faint" title="" classes="form-item m-t-8" isNumbered={false} />
				</div>
			))}
		</div>
		<Stakeholders
			className="form-item"
		/>
	</div>
);

StakeholderGroup.propTypes = {
  stakeholders: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  stakeholders: state.rfp.newProposal.stakeholders,
});

export default connect(mapStateToProps, null)(StakeholderGroup);
