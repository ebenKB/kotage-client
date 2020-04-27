/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import './pdf-preview.scss';
import { Button, Image } from 'semantic-ui-react';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DownloadIcon from '@material-ui/icons/GetApp';
import { getFileNameAndExtension } from '../../utils/app/file';

const PdfPreview = ({ fileObject, handleCloseAction }) => (
	<div className="file-preview__wrapper">
		<div className="file-preview__backdrop" />
		<div className="file-preview__content">
			<div className="file-preview-header kt-bg-shadow">
				<div className="text-right flex-center">
					{fileObject && (
						<a
							href={fileObject.staticUrl}
							download={getFileNameAndExtension(fileObject.file_url)}
							className="kt-transparent flex-center float-r m-r-20 kt-item__cta-tool-tip"
							attr-data="Download"
						>
							<DownloadIcon className="medium logo dark auto-height" />
						</a>
					)}
					<div
						className="kt-item__cta-tool-tip"
						attr-data="Close"
					>
						<Button
							draggable
							default
							size="tiny"
							icon={<CancelOutlinedIcon className="big logo dark" />}
							className="kt-transparent flex-center"
							content=""
							onClick={handleCloseAction}
						/>
					</div>
				</div>
			</div>
			<div className="file-preview-content__body">
				<div className="file-preview">
					{/* <h2>The file will be previewed here.</h2> */}
					<Image src={fileObject.staticUrl} fluid />
				</div>
				<div className="kt-bg-shadow">
					{/* controls */}
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
