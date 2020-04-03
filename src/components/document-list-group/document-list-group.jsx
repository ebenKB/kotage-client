/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import DocumentListItem from '../document-list-item/document-list-item';
import Divider from '../kt-divider/divider';
import './document-list.scss';

const DocumentListGroup = ({ documents }) => (
	<div className="kt-doc-list__group">
		{/* <Divider type="thick" title="Requested Documents" /> */}
		<div className="bold">Requested Documents</div>
		<div>
			<div className="kt-doc-list__heading m-t-10">
				<div>NAME</div>
				<div>DESCRIPTION</div>
			</div>
			<Divider type="faint" title="" classes="m-t-10 m-b-10" />
			{documents && documents.map((doc) => (
				<DocumentListItem
					key={doc.id}
					document={doc}
				/>
			))}
		</div>
	</div>
);

DocumentListGroup.propTypes = {
  documents: PropTypes.array.isRequired,
};

export default DocumentListGroup;
