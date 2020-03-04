/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'semantic-ui-react';
import { ReactComponent as Menu } from '../../../../svg/menu.svg';
import { ReactComponent as PowerPoint } from '../../../../svg/pptx.svg';
import { ReactComponent as PDF } from '../../../../svg/pdf.svg';
import { ReactComponent as JPEG } from '../../../../svg/jpg.svg';
import { ReactComponent as EXCEL } from '../../../../svg/excel.svg';
import { ReactComponent as WORD } from '../../../../svg/word.svg';
import { ReactComponent as CSV } from '../../../../svg/csv.svg';


const DropzoneItem = ({ file, deleteFile, idx }) => {
  const handleDelete = (f) => {
    deleteFile(f);
  };

  // this function returns the appropriate icon based on the file type
  const getFileIcon = () => {
    if (file.type === 'application/pdf') {
      return (<PDF className="dark medium logo" />);
    }

    if (file.type === 'application/docx'
      || file.type === 'application/doc'
      || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (<WORD className="dark medium logo" />);
    }

    if (file.type === 'application/csv') {
      return (<CSV className="dark medium logo" />);
    }

    if (file.type === 'image/jpg' || file.type === 'image/jpeg') {
      return (<JPEG className="dark medium logo" />);
    }

    if (file.type === 'application/xlsx'
      || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return (<EXCEL className="dark medium logo" />);
    }

    if (file.type === 'application/pptx') {
      return (<PowerPoint className="dark medium logo" />);
    }

    return (<PowerPoint className="dark medium logo" />);
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
			{getFileIcon()}
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
  idx: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired,
  deleteFile: PropTypes.func.isRequired,
};
export default DropzoneItem;
