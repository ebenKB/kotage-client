/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import Input from '../input/input';
import DeleteButton from '../../buttons/delete-button';
import './kt-docs.scss';

const KtDocs = ({
  doc, deleteDocument, index, updateDocument,
}) => {
  const handleTextChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const newDoc = doc;
    newDoc[name] = value;
    updateDocument(index, newDoc);
  };

  return (
	<div className="docs-wrapper__content m-t-20">
		<div>
			<Input
				type="text"
				placeholder="Document name"
				value={doc.name}
				name="name"
				onChange={handleTextChange}
				className="fluid"
			/>
		</div>
		<div>
			<Input
				type="text"
				placeholder="Document Description"
				classes="fluid"
				value={doc.description}
				name="description"
				onChange={handleTextChange}
			/>
		</div>
		<div>
			<DeleteButton
				type="icon"
				handleAction={() => deleteDocument(doc.id)}
			/>
		</div>
	</div>
  );
};

export default KtDocs;
