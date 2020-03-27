/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';

const DocumentListItem = ({ document }) => (
	<div className="kt-doc-list__content">
		<div>{document.name}</div>
		<div>{document.description}</div>
	</div>
);

DocumentListItem.propTypes = {
  document: PropTypes.object.isRequired,
};

export default DocumentListItem;
