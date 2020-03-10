/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import Input from '../input/input';
import { ReactComponent as Logo } from '../../../svg/plus.svg';
import DeleteButton from '../../buttons/delete-button';

import './kt-docs.scss';

const KtDocs = ({ className }) => {
  const [document, setDocument] = useState({ name: '', description: '' });
  const handleClick = () => {

  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setDocument((doc) => ({
      ...doc,
      [name]: value,
    }));
  };

  return (
	<div className={`docs-group m-t-30 ${className}`}>
		<div className="bold">Documents</div>
		<div className="docs-wrapper">
			<div className="docs-wrapper__header bold light-caption">
				<div className="">Name</div>
				<div className="">Description</div>
			</div>
			<div className="docs-wrapper__content m-t-20">
				<div>
					<Input
						type="text"
						placeholder="Document name"
						value={document.title}
						name="title"
						onChange={handleTextChange}
					/>
				</div>
				<div>
					<Input
						type="text"
						placeholder="Document Description"
						classes="fluid"
						value={document.description}
						name="description"
						onChange={handleTextChange}
					/>
				</div>
				<div>
					<DeleteButton type="icon" />
				</div>
			</div>
			<div className="clickable m-t-20 kt-primary bold sm-caption flex-center" role="button" onClick={handleClick} onKeyDown={handleClick}>
				<Logo className="kt-logo__small kt-primary" />
				<span>Request New Document</span>
			</div>
		</div>
	</div>
  );
};

export default KtDocs;
