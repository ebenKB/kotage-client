/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import './pdf-preview.scss';
import { Button } from 'semantic-ui-react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DownloadIcon from '@material-ui/icons/GetApp';
import { getFileNameAndExtension } from '../../utils/app/file';

const PdfPreview = ({ fileObject, handleCloseAction }) => (
	<div className="file-preview__wrapper">
		<div className="file-preview__backdrop" />
		<div className="file-preview__content">
			<div className="file-preview-header">
				<div className="text-right flex-center">
					{fileObject && (
						<a
							href={fileObject.staticUrl}
							download={getFileNameAndExtension(fileObject.file_url)}
							className="kt-transparent flex-center float-r m-r-20"
						>
							<DownloadIcon className="medium logo dark auto-height" />
						</a>
					)}
					<Button
						default
						size="tiny"
						icon={<CancelOutlinedIcon className="big logo dark" />}
						className="kt-transparent flex-center"
						content=""
						onClick={handleCloseAction}
					/>
				</div>
			</div>
			<div className="file-preview-content__body">
				<div className="file-preview">
          file preview
				</div>
			</div>
		</div>
	</div>
);

PdfPreview.propTypes = {
  fileObject: PropTypes.object.isRequired,
  handleCloseAction: PropTypes.func.isRequired,
};

export default PdfPreview;
