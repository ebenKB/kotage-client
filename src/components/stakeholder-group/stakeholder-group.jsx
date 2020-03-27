/* eslint-disable camelcase */
/* eslint-disable react/boolean-prop-naming */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import AddStakeholder from '../snippets/add-stakeholder/add-stakeholder';
import Divider from '../kt-divider/divider';
import './stakeholder.scss';
import StakeholderItem from '../stakeholder-item/stakeholder-item';
import StakeholderItemFetch from '../stakeholder-item-fetch/stakeholder-item-fetch';

const StakeholderGroup = ({
  stakeholders, addStakeholder, shouldFetchData, removeStakeholder, mode, classes,
}) => (
	<div>
		{(stakeholders === null || stakeholders.length === 0) && mode === 'readonly' && (
			<p>There are no stakeholders</p>
		)}
		{(stakeholders && stakeholders.length > 0) && (
			<div>
				<div className={`sm-caption faint ${classes} form-item stakeholder-group`}>
					<div className="faint-caption">NAME OR EMAIL</div>
					<div className="light-caption">PERMISSIONS</div>
					{mode !== 'readonly' && (
						<div className="light-caption">ACTION</div>
					)}
				</div>
				<Divider type="faint" title="" classes="form-item m-t-8" isNumbered={false} />
				{mode === 'write' && stakeholders && stakeholders.map((stakeholder) => (
					<div key={stakeholder.id}>
						<StakeholderItem
							stakeholder={stakeholder}
							removeStakeholder={(id) => removeStakeholder(id)}
							mode={mode}
						/>
						<Divider type="faint" title="" classes="form-item m-t-8" isNumbered={false} />
					</div>
				))}
				{mode === 'readonly' && stakeholders && stakeholders.map((stakeholder) => (
					<StakeholderItemFetch
						mode={mode}
						stakeholderObj={stakeholder}
					/>
				))}
			</div>
		)}
		{mode === 'write' && (
			<AddStakeholder
				shouldFetchData={shouldFetchData}
				className="form-item"
				addNewStakeholder={(stakeholder, access) => addStakeholder(stakeholder, access)}
			/>
		)}
	</div>
);

StakeholderGroup.propTypes = {
  stakeholders: PropTypes.array.isRequired,
  addStakeholder: PropTypes.func.isRequired,
  shouldFetchData: PropTypes.bool.isRequired,
  removeStakeholder: PropTypes.func.isRequired,
  classes: PropTypes.string,
  mode: PropTypes.string,
};

StakeholderGroup.defaultProps = {
  mode: 'write',
  classes: '',
};

export default StakeholderGroup;
