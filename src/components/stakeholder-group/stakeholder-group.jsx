/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import AddStakeholder from '../snippets/add-stakeholder/add-stakeholder';
import Divider from '../kt-divider/divider';
import './stakeholder.scss';
import StakeholderItem from '../stakeholder-item/stakeholder-item';


const StakeholderGroup = ({ stakeholders, addStakeholder }) => (
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
		<AddStakeholder
			className="form-item"
			addNewStakeholder={(stakeholder, access) => addStakeholder(stakeholder, access)}
		/>
	</div>
);

StakeholderGroup.propTypes = {
  stakeholders: PropTypes.array.isRequired,
  addStakeholder: PropTypes.func.isRequired,
};


export default StakeholderGroup;
