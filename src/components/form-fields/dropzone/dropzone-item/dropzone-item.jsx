/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
import { ReactComponent as Logo } from '../../../../svg/cancel.svg';
import { ReactComponent as File } from '../../../../svg/file.svg';

const DropzoneItem = ({ file, deleteFile, idx }) => {
  const handleDelete = (file) => {
    deleteFile(file);
  };

  const getItemType = () => {
    if ((file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png')) {
      return (
	<div className="dropzone-item hoverable">
		<div
			className="cta clickable"
			onClick={() => handleDelete(idx)}
		>
			<Logo className="kt-logo__small" />
			<span>Remove</span>
		</div>
		<img src={URL.createObjectURL(file)} alt="" className="kt-logo__custom" />
	</div>
      );
    }
    return (
	<div className="dropzone-item">
		<div className="file-item">
			<File className="kt-logo__small" />
			{file.name}
		</div>
		<span
			className="cta clickable"
			onClick={() => handleDelete(idx)}
		>
			<Logo className="kt-logo__small" />
		</span>
	</div>
    );
  };
  return (
	<Fragment>
		<span>
			{getItemType()}
		</span>
	</Fragment>
  );
};

export default DropzoneItem;
