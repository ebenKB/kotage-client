/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import DocumentListItem from '../document-list-item/document-list-item';
import Divider from '../kt-divider/divider';

const DocumentListGroup = ({ documents }) => (
	<div className="kt-doc-list__group">
		<Divider type="thick" title="REQUESTED DOCUMENTS" />
		<div className="kt-doc-list__heading m-t-20">
			<div>NAME</div>
			<div>DESCRIPTION</div>
		</div>
		<Divider type="faint" title="" classes="m-t-10 m-b-10" />
		{documents && documents.map((doc) => (
			<DocumentListItem
				document={doc}
			/>
		))}
	</div>
);

DocumentListGroup.propTypes = {
  documents: PropTypes.object.isRequired,
};

export default DocumentListGroup;