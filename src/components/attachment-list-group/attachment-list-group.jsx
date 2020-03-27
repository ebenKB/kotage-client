/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import Divider from '../kt-divider/divider';

const AttachmentListGroup = ({ files }) => (
	<div>
		<Divider type="thick" title="ATTACHMENTS" />
		{files && files.length === 0 && (
			<p className="m-t-10">There are no files attached to this proposal</p>
		)}
		{files && files.length > 0 && (
			<p className="m-t-10">
				{files.length}
				{' '}
        file(s) attached to this proposal
			</p>
		)}
	</div>
);

AttachmentListGroup.propTypes = {
  files: PropTypes.array.isRequired,
};

export default AttachmentListGroup;
