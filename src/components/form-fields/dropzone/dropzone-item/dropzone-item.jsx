/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as Menu } from '../../../../svg/menu.svg';
import { ReactComponent as PowerPoint } from '../../../../svg/pptx.svg';


const DropzoneItem = ({ file, deleteFile, idx }) => {
  const handleDelete = (f) => {
    deleteFile(f);
  };
  return (
	<div className="dropzone-item">
		<div>
			<Menu className="small logo" />
		</div>
		<div>
			<div className="bold">Implementation plan</div>
			<div className="light-caption sm-caption">
				{file && file.name}
			</div>
		</div>
		<div>
			<PowerPoint className="dark medium logo" />
		</div>
		<Button.Group basic size="mini" className="dropzone-cta">
			<Button>EDIT</Button>
			<Button
				onClick={() => handleDelete(idx)}
			>
        DELETE
			</Button>
		</Button.Group>
	</div>
  );
};

DropzoneItem.propTypes = {
  idx: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  deleteFile: PropTypes.func.isRequired,
};
export default DropzoneItem;
