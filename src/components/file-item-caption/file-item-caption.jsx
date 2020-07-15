/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import Divider from '../kt-divider/divider';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';

const FileItemCaption = ({ file, handleDeleteFile }) => (
	<div>
		<div className="fluid flex-center space-between">
			<p>{file.title}</p>
			<Button
				size="tiny"
				content={<CloseIcon className="small dark logo" />}
				className="kt-transparent"
				onClick={handleDeleteFile}
			/>
		</div>
		<Divider type="faint" classes="m-t-5 m-b-5" />
	</div>
);

FileItemCaption.propTypes = {
  file: PropTypes.object.isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
};

export default FileItemCaption;
