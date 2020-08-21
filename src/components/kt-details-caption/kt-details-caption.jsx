/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Proptypes from 'prop-types';

const KtDetailsCaption = ({ description, classes }) => (
	<div className={`kt-bg-shadow kt-text-caption__wrapper ${classes}`}>
		{description}
	</div>
);

KtDetailsCaption.propTypes = {
  description: Proptypes.object.isRequired,
  classes: Proptypes.string.isRequired,
};

export default KtDetailsCaption;
