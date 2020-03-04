/* eslint-disable react/jsx-fragments */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { ReactComponent as Menu } from '../../../../svg/menu.svg';
import { ReactComponent as PowerPoint } from '../../../../svg/pptx.svg';

const DropzoneItem = ({ file, deleteFile, idx }) => {
  const handleDelete = (file) => {
    deleteFile(file);
  };

  // const getItemType = () => {
  //   if ((file.type === 'image/jpeg') || (file.type === 'image/jpg') ||
  //      (file.type === 'image/png')) {
  //     return (

  //     );
  //   }
  //   return (
  // <div className="dropzone-item">
  // 	<div className="file-item">
  // 		<File className="kt-logo__small" />
  // 		{file.name}
  // 	</div>
  // 	<span
  // 		className="cta clickable"
  // 		onClick={() => handleDelete(idx)}
  // 	>
  // 		<Logo className="kt-logo__small" />
  // 	</span>
  // </div>
  //   );
  // };

  return (
	<div className="dropzone-item">
		<div>
			<Menu className="small logo" />
		</div>
		<div>
			<div className="bold">Implementation plan</div>
			<div className="light-caption sm-caption">
				{file && file.name}
        Implementation_plan.pptx
			</div>
		</div>
		<div>
			<PowerPoint className="dark medium logo" />
		</div>
		<Button.Group basic size="mini" className="dropzone-cta">
			<Button>EDIT</Button>
			<Button
				onClick={handleDelete(idx)}
			>
      DELETE
			</Button>
		</Button.Group>
	</div>
  );
};

export default DropzoneItem;
