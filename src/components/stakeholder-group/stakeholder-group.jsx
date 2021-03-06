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
				<div className={`sm-caption faint ${classes} stakeholder-group`}>
					<div className="faint-caption">NAME OR EMAIL</div>
					<div className="light-caption">PERMISSIONS</div>
					{mode !== 'readonly' && (
						<div className="light-caption">ACTION</div>
					)}
				</div>
				<Divider type="faint" title="" classes=" m-t-8" isNumbered={false} />
				{mode === 'write' && stakeholders && stakeholders.map((stakeholder) => (
					<div key={stakeholder.id}>
						<StakeholderItem
							stakeholder={stakeholder}
							removeStakeholder={(id) => removeStakeholder(id)}
							mode={mode}
						/>
						<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
					</div>
				))}
				{mode === 'readonly' && stakeholders && stakeholders.map((stakeholder) => (
					<div key={stakeholder.id}>
						<StakeholderItemFetch
							key={stakeholder.id}
							mode={mode}
							stakeholderObj={stakeholder}
						/>
						<Divider type="faint" title="" classes="m-t-8" isNumbered={false} />
					</div>
				))}
			</div>
		)}
		{mode === 'write' && (
			<AddStakeholder
				shouldFetchData={shouldFetchData}
				className=""
				addNewStakeholder={(stakeholder, access) => addStakeholder(stakeholder, access)}
			/>
		)}
	</div>
);

StakeholderGroup.propTypes = {
  stakeholders: PropTypes.array.isRequired,
  addStakeholder: PropTypes.func,
  shouldFetchData: PropTypes.bool.isRequired,
  removeStakeholder: PropTypes.func,
  classes: PropTypes.string,
  mode: PropTypes.string,
};

StakeholderGroup.defaultProps = {
  mode: 'write',
  classes: '',
  addStakeholder: null,
  removeStakeholder: null,
};

export default StakeholderGroup;
