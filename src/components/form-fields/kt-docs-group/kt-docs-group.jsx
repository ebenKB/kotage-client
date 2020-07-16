/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import AddItem from '../../snippets/add-item/add-item';
import KtDoc from './kt-docs';

import './kt-docs.scss';

const KtDocs = ({
  className, documents, deleteDocument, addNewDocument, updateDocument,
}) => (
	<div className={`docs-group m-t-10 ${className}`}>
		<div className="bold">Documents</div>
		<p className="m-t-10">
			Ask you suppliers for additional documents.
			Including a signed contract, proof of insurance or tax clearance
		</p>
		<div className="docs-wrapper m-t-10">
			{documents && (
				<div className="docs-wrapper__header bold light-caption">
					<div className="">Name</div>
					<div className="">Description</div>
				</div>
			)}
			{documents && documents.map((doc, idx) => (
				<>
					<KtDoc
						key={doc.id}
						doc={doc}
						deleteDocument={(id) => deleteDocument(id)}
						index={idx}
						id={doc.id}
						updateDocument={(index, newDoc) => updateDocument(index, newDoc)}
					/>
				</>
			))}
			<div className="m-t-20">
				<AddItem
					title="Request New Document"
					handleClick={addNewDocument}
				/>
			</div>
		</div>
	</div>
);


export default KtDocs;
